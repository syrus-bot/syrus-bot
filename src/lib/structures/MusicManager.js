/*
    Syrus - a multipurpose Discord bot, designed to be the best so you don't need the rest.
    Copyright (C) 2020, Syrus Development Team (Nytelife26 / nytelife@protonmail.com, Logan Heinzelman, ColeCCI and mynameismrtime)

    This file is part of Syrus.

    Syrus is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    Syrus is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with Syrus.  If not, see <https://www.gnu.org/licenses/>.
*/

const { Client: Lavaqueue } = require("lavaqueue");
const config = require("../../config.json");
const { ok, err } = require("@sapphire/framework")
// const Queue = require("./Queue");
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

		client.on("raw", (packet) => {
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
		});
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
