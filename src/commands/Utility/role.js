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
			name: "role",
			aliases: ["r", "ro"],
			description: "commands:utilities.role.description",
			preconditions: ["GuildOnly", {entry: "permissions", context: {
				permissions: new Permissions(Permissions.FLAGS.MANAGE_ROLES)
			}}]
		});
	}

	async run(message, args) {
		const memberParse = await args.pickResult("parsemember");
		if (!memberParse.success) {
			return message.sendTranslated(
				"global:notfound",
				[{type: "member"}]
			);
		}
		const roleParse = await args.pickResult("parserole");
		if (!roleParse.success) {
			return message.sendTranslated(
				"global:notfound",
				[{type: "role"}]
			);
		}
		const member = memberParse.value;
		const role = roleParse.value;
		if (!role.editable || member.roles.highest.position <= role.position) {
			return message.sendTranslated(
				"global:highererr",
				[{
					func: "grant or remove",
					type: "role"
				}]
			);
		}
		if (member.roles.cache.has(role.id)) {
			member.roles.remove(role.id).then((ok) => {
				message.sendTranslated(
					"commands:utilities.role.removed",
					[{
						role: role.name,
						user: `${member.user.username}#${member.user.discriminator}`
					}]
				);
			});
		} else {
			member.roles.add(role.id).then((ok) => {
				message.sendTranslated(
					"commands:utilities.role.added",
					[{
						role: role.name,
						user: `${member.user.username}#${member.user.discriminator}`
					}]
				);
			});
		}
	}
}
