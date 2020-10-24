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
const { MessageEmbed } = require("discord.js")

module.exports = class ClientCommand extends SyrusCommand {
	constructor(context) {
		super(context, {
			name: "pp",
			description: "commands:fun.pp.description"
		});
	}

	async run(message, args) {
		const shaft = "=".repeat(Math.floor(Math.random() * 24));
		const member = await args.pickResult("member");
		let disp;
		if (member.success) {
			disp = member.value.displayName;
		} else {
			disp = message.author.username;
		}
		message.channel.send(
			new MessageEmbed()
				.setColor("#34eb7d")
				.setTitle(`${disp}'s PP size`)
				.setDescription(`**8${shaft}D**`)
		);
	}
}
