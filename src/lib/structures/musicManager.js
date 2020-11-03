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
const fetch = require("node-fetch");
const { duration } = require("moment");
const { ok, err } = require("@sapphire/framework")

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
				rest: `http://${NODE.host}:${NODE.port}`,
				redis: REDIS
			},
			send: send
		});
		this.client = client;

		if (client.guilds.cache && typeof client.ws.send === "undefined") {
			client.ws
				.on(
					"VOICE_STATE_UPDATE",
					(shard, state) => this.voiceStateUpdate(state)
				)
				.on(
					"VOICE_SERVER_UPDATE",
					(shard, info) => this.voiceServerUpdate(info)
				)
				.on(
					"GUILD_CREATE",
					(shard, guild) => {
						for (const state of guild.voice_states) {
							this.voiceStateUpdate(state);
						}
					}
				);
		} else {
			client.on("raw", async (packet) => {
				switch (packet.t) {
					case "VOICE_SERVER_UPDATE":
						await this.voiceServerUpdate(packet.d);
						break;
					case "VOICE_STATE_UPDATE":
						await this.voiceStateUpdate(packet.d);
						break;
					case "GUILD_CREATE":
						for await (const state of packet.d.voice_states) {
							await this.voiceStateUpdate(state);
						}
						break;
					default:
						// noop
				}
			});
		}
	}
}
