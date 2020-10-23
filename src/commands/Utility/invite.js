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
const { Permissions } = require("discord.js");

module.exports = class ClientCommand extends SyrusCommand {
	constructor(context) {
		super(context, {
			name: "invite",
			aliases: ["ci", "crinv"],
			description: "commands:utilities.invite.description",
			preconditions: ["GuildOnly", {entry: "permissions", context: {
				permissions: new Permissions(
					Permissions.FLAGS.CREATE_INSTANT_INVITE
				)
			}}]
		});
	}

	async run(message) {
		message.channel.createInvite(
			{ maxAge: 0, maxUses: 0 },
			`Created by ${message.author.toString()}`
		).then((invite) => {
			message.sendTranslated(
				"commands:utilities.invite.created",
				[{inv: invite.toString()}]
			);
		});
	}
};
