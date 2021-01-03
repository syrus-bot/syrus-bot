const { Client: Lavaqueue } = require("lavaqueue");
const { MessageEmbed } = require("discord.js");
const { Queue } = require("lavaqueue");

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

function eventHandler(inbound) {
	switch (inbound.type) {
		case "TrackStartEvent": {
			this.decode(inbound.track).then((track) => {
				const embed = new MessageEmbed()
					.setTitle("Now playing...")
					.setDescription(
						`[${track.author} | ${track.title}](${track.uri})`
					);
				this.queues.get(inbound.guildId).player.infoChannel.send(embed);
			});
			break;
		}
		case "TrackEndEvent": {
			const queue = this.queues.get(inbound.guildId);
			if (queue.player.infoChannel === undefined) {
				break;
			}
			queue.length().then((length) => {
				if (!length) {
					const embed = new MessageEmbed()
						.setTitle("Queue finished...");
					queue.player.infoChannel.send(embed);
				}
			});
			break;
		}
		default: {
			// noop
		}
	}
}

function errorHandler(error) {
	if (["ECONNREFUSED", "ENOTFOUND"].includes(error.code)) {
		if (!this.failed) {
			const address = error.address;
			const port = error.port;
			this.client.logger.warn(
				`Lavalink on ${address}:${port} failed. Retrying...`
			);
		}
		this.failed += 1;
	}
}

function readyHandler() {
	this.client.logger.info(
		`Lavalink connected successfully after ${this.failed} attempts.`
	);
}

module.exports = class MusicManager extends Lavaqueue {
	constructor(client, config) {
		const node = config.lavalink;
		super({
			userID: client.user.id,
			password: node.password,
			hosts: {
				rest: `http${node.ssl}://${node.host}:${node.port}`,
				ws: `ws${node.ssl}://${node.host}:${node.port}`,
				redis: config.redis
			},
			send: send
		});
		this.client = client;
		this.failed = 0;

		/* packetHandler updates voice states
		   eventHandler listens on rotating queue */
		client.on("raw", packetHandler.bind(this));
		this.on("event", eventHandler.bind(this));
		this.on("error", errorHandler.bind(this));
		this.on("open", readyHandler.bind(this));
	}

	get(key) {
		let queue;
		queue = super.get(key);
		if (!queue) {
			queue = new Queue(this, key);
			this.set(key, queue);
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
};
