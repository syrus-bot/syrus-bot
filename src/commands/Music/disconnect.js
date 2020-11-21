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
			name: "disconnect",
			description: "music:disconnect.description"
		});
	}

	async run(message, args) {
		const theirVoice = message.member.voice;
		const myVoice = message.guild.me.voice;
		if (theirVoice.channelID !== myVoice.channelID) {
			return message.sendTranslated(
				"music:reqsamechannel",
				[{channel: theirVoice.channel.name}]
			)
		}

		const queue = this.client.music.queues.get(message.guild.id);
		await queue.clear();
		await queue.player.leave();
		await queue.player.destroy();
		return message.sendTranslated(
			"music:disconnect.disconnected",
			[{channel: theirVoice.channel.name}]
		);
	}
};
