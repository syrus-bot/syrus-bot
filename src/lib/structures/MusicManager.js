const { Client: Lavaqueue } = require("lavaqueue");
const config = require("../../config.json");
const { ok, err } = require("@sapphire/framework")
const { MessageEmbed } = require("discord.js");
const { Queue } = require("lavaqueue");
const NODE = config.lavalink;
const REDIS = config.redis;

function send(guildID, packet) {
	if (this.client.guilds.cache) {
		const guild = this.client.guilds.cache.get(guildID);
		if (guild) {
			return guild.shard.send(packet);
		}
	} else {
		const guild = this.client.guilds.get(guildID);
		if (guild) {
			const sockSend = this.client.ws.send;
			const shardSend = guild.shard.send;
			const socket = typeof sockSend === "function";
			return socket ? sockSend(packet) : shardSend(packet);
		}
	}
}

function packetHandler(packet) {
	switch (packet.t) {
		case "VOICE_SERVER_UPDATE":
			this.voiceServerUpdate(packet.d);
			break;
		case "VOICE_STATE_UPDATE":
			this.voiceStateUpdate(packet.d);
			break;
		default:
			// noop
	}
}

async function eventHandler(inbound) {
	if (inbound.type === "TrackStartEvent") {
		this.decode(inbound.track).then((track) => {
			const embed = new MessageEmbed()
				.setTitle("Now playing...")
				.setDescription(
					`[${track.author} | ${track.title}](${track.uri})`
				);
			this.queues.get(inbound.guildId)
				.player.infoChannel.send(embed);
		});
	}
	if (inbound.type === "TrackEndEvent" && inbound.reason === "STOPPED") {
		const embed = new MessageEmbed()
			.setTitle("Queue finished...");
		this.queues.get(inbound.guildId)
			.player.infoChannel.send(embed);
	}
}

module.exports = class MusicManager extends Lavaqueue {
	constructor(client) {
		super({
			userID: client.user.id,
			password: NODE.password,
			hosts: {
				rest: `http${NODE.ssl}://${NODE.host}:${NODE.port}`,
				ws: `ws${NODE.ssl}://${NODE.host}:${NODE.port}`,
				redis: REDIS
			},
			send: send
		});
		this.client = client;

		/* packetHandler updates voice states
		   eventHandler listens on rotating queue */
		client.on("raw", packetHandler.bind(this));
		this.on("event", eventHandler.bind(this));
	}

	get(key) {
		let queue;
		queue = super.get(key);
		if (!queue) {
			queue = new Queue(this, key);
			this.set(key, queue)
		}
		return queue;
	}

	async fetchTracks(query) {
		let finder;
		try {
			finder = new URL(query);
		} catch (err) {
			if (err instanceof TypeError) {
				finder = `ytsearch:${query}`;
			}
		}
		return this.load(finder);
	}
}
