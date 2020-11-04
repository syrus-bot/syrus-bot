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

const SyrusCommand = require("../../lib/structures/SyrusCommand");
const { Args, CommandOptions } = require("@sapphire/framework");

module.exports = class ClientCommand extends SyrusCommand {

	constructor(context) {
		super(context, {
			name: "play",
			description: "music:play.description"
		});
	}

	async run(message, args) {
		const theirVoice = message.member.voice.channel;
		if (!theirVoice || !theirVoice?.joinable) {
			return message.sendTranslated("music:channelreq");
		}

		const songs = await args.restResult("string");
		if (!songs.success) {
			return message.sendTranslated(
				"global:commerr.missingparams",
				[{arg: "song"}]
			)
		}

		const queue = this.client.music.queues.get(message.guild.id);
		const myVoice = message.guild.me.voice;
		if (!myVoice.channel) {
			await queue.player.join(theirVoice.id);
		}
		const tracks = await this.client.music.fetchTracks(songs.value)
		switch (tracks.loadType) {
			// TODO: implement handler for search
			case "TRACK_LOADED":
				await queue.add(tracks.tracks.map((track) => track.track));
				break;
			case "PLAYLIST_LOADED":
				await queue.add(tracks.tracks.map((track) => track.track));
				break;
			default:
				// noop
		}
		// TODO: implement embed for playing
		await queue.start();
	}
};
