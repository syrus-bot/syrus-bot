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

const { Manager } = require("@lavacord/discord.js");
const snekfetch = require("snekfetch");
const { duration } = require("moment");
const { ok, err } = require("@sapphire/framework")

const nodes = [{
	host: "localhost",
	port: 2333,
	region: "us_central",

	password: "youshallnotpass"
}];


class MusicManager {
	constructor(guild) {
		this.client = guild.client;
		this.manager = new Manager(guild.client, nodes, {
			user: guild.client.user.id,
			shards: 1
		});
		this.queue = [];
		this.current = null;
		this.player = null;
	}

	async queueSong(msg, string) {
		let query;
		const urltest = new URL(string);
		if (urltest.protocol && urltest.host && urltest.pathname) {
			query = string;
			// TODO: implement playlist handling based on URLs
		} else {
			query = `ytsearch:${string}`;
		}
		const res = await snekfetch.get(
			`http://localhost:2333/loadtracks?identifier=${query}`
		)
			.set("Authorization", "youshallnotpass")
			.catch((err) => {
				console.error(err);
				return null;
			});
		if (!res) {
			throw err("There was an error, try again");
		}
		if (!res.body.tracks.length) {
			throw err(msg.language.get("COMMAND_MUSIC_QUEUE_NOT_FOUND"));
		}
		const track = res.body.tracks[0];
		// TODO: add thumbnail property to song object to support both YouTube and SoundCloud thumbnails
		const song = {
			requester: msg.author,
			trackIdentifier: track.info.identifier,
			track: track.track,
			seekable: track.info.isSeekable,
			author: track.info.author,
			length: track.info.length,
			isStream: track.info.isStream,
			position: track.info.position,
			title: track.info.title,
			url: track.info.uri,
			playmsg: null
		};
		this.queue.push(song);
		msg.send({embed: {
			title: msg.language.get("COMMAND_MUSIC_QUEUED_TRACK"),
			color: msg.guild.client.config.color,
			description: `**[${track.info.title}](${track.info.uri})**`
		}});

		if (this.player.playing === false) {
			return this.play(msg);
		}
	}

	async play(msg) {
		if (this.current === null && this.queue.length) {
			this.current = this.queue.shift();
		}
		this.player.play(JSON.stringify(this.current.track));
		this.player.once("error", (error) => console.error(error));
		this.player.once("end", (data) => {
			if (data.reason === "REPLACED") {
				return;
			}
			if (!this.queue.length) {
				this.current = null;
				this.queue = [];
				return msg.channel.send({ embed: {
					title: msg.language.get(
						"COMMAND_MUSIC_QUEUE_FINISHED_TITLE"
					),
					description: msg.language.get(
						"COMMAND_MUSIC_QUEUE_FINISHED_DESCR"
					),
					color: msg.guild.client.config.color
				}});
			}
			this.current.playmsg.delete();
			this.play(msg);
		});
		const requester = this.current.requester
		msg.channel.send({
			embed: {
				title: msg.language.get("COMMAND_MUSIC_TRACK_START"),
				color: msg.guild.client.config.color,
				description: `**[${this.current.title}](${this.current.url})**`,
				thumbnail: {
					url: `https://img.youtube.com/vi/${this.current.trackIdentifier}/mqdefault.jpg`
				},
				fields: [{
					name: msg.language.get("COMMAND_MUSIC_LENGTH"),
					value: duration(this.current.length).format("HH:mm:ss"),
					inline: true
				},
				{
					name: msg.language.get("COMMAND_MUSIC_REQUESTER"),
					value: `${requester.toString()} (${requester.id})`,
					inline: true
				}]
			}
		}).then((message) => {
			this.current.playmsg = message;
		});
	}

	async join(voice) {
		this.player = this.manager.join({
			guild: voice.guild.id,
			channel: voice.channelID,
			host: "localhost"
		});
	}

	async disconnect(guild) {
		this.manager.leave(guild.id);
	}

	async stop(msg) {
		if (!this.player || !this.player.playing) {
			return msg.reply(msg.language.get("COMMAND_MUSIC_NOT_PLAYING"));
		}
		this.disconnect(msg.guild.id);
		this.queue = [];
		msg.channel.send({
			embed: {
				title: msg.language.get("COMMAND_MUSIC_STOPPED"),
				color: msg.guild.client.config.color
			}
		});
	}

	async pause(msg) {
		if (!this.player || !this.player.playing) {
			return msg.reply(msg.language.get("COMMAND_MUSIC_NOT_PLAYING"));
		}
		if (this.player.paused) {
			return msg.language.get("COMMAND_MUSIC_PAUSED");
		}
		this.player.pause(true);
		return msg.channel.send({
			embed: {
				title: msg.language.get("COMMAND_MUSIC_PAUSE"),
				color: msg.guild.client.config.color
			}
		});
	}

	async resume(msg) {
		if (!this.player || !this.player.playing) {
			return msg.reply(msg.language.get("COMMAND_MUSIC_NOT_PLAYING"));
		}
		if (!this.player.paused) {
			return msg.language.get("COMMAND_MUSIC_UNPAUSED");
		}
		this.player.pause(false);
		return msg.channel.send({
			embed: {
				title: msg.language.get("COMMAND_MUSIC_RESUME"),
				color: msg.guild.client.config.color
			}
		});
	}

	async skip(msg) {
		if (!this.player || !this.player.playing) {
			return msg.reply(msg.language.get("COMMAND_MUSIC_NOT_PLAYING"));
		}
		this.player.stop();
		msg.channel.send({
			embed: {
				title: msg.language.get("COMMAND_MUSIC_SKIPPED"),
				color: msg.guild.client.config.color
			}
		});
	}

	async nowPlaying(msg) {
		if (!this.player || !this.player.playing) {
			return msg.reply(msg.language.get("COMMAND_MUSIC_NOT_PLAYING"));
		}
		let {state} = this.player;
		return msg.channel.send({
			embed: {
				title: msg.language.get("COMMAND_MUSIC_NOW_PLAYING"),
				color: msg.guild.client.config.color,
				description: `**[${this.current.title}](${this.current.url})**`,
				thumbnail: {
					url: `https://img.youtube.com/vi/${this.current.trackIdentifier}/mqdefault.jpg`
				},
				fields: [
					{
						name: msg.language.get("COMMAND_MUSIC_LENGTH"),
						value: `${duration(state.position).format("h:mm:ss")} / ${duration(this.current.length).format("h:mm:ss")}`,
						inline: true
					},
					{
						name: msg.language.get("COMMAND_MUSIC_REQUESTER"),
						value: `${this.current.requester.username}#${this.current.requester.discriminator} (${this.current.requester})`,
						inline: true
					}
				]
			}
		});
	}
}

module.exports = MusicManager;
