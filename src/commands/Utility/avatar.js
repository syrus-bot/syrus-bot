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
const { MessageEmbed } = require("discord.js");

module.exports = class ClientCommand extends SyrusCommand {
	constructor(context) {
		super(context, {
			name: "avatar",
			description: "commands:utility.avatar.description",
			preconditions: ["GuildOnly"]
		});
	}

	async run(message, args) {
		const member = await args.pickResult("parsemember");
		let target;
		if (member.success) {
			target = member.value;
		} else {
			target = message.member;
		}
		const url = target.user.avatarURL({format: "png", dynamic: true})
		message.channel.send(
			new MessageEmbed()
				.setColor("#34eb7d")
				.setTitle(`${target.user.username}'s Avatar`)
				.setDescription(`[CLICK HERE FOR LINK](${url})`)
				.setImage(url)
		);
	}
}
