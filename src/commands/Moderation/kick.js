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
			name: "kick",
			description: "commands:moderation.kick.description",
			preconditions: ["GuildOnly", {entry: "permissions", context: {
				permissions: new Permissions(Permissions.FLAGS.KICK_MEMBERS)
			}}]
		});
	}

	async run(message, args) {
		const member = await args.pickResult("parsemember");
		if (!member.success) {
			return message.sendTranslated(
				"global:notfound",
				[{type: "member"}]
			);
		}

		const authorPosition = message.member.roles.highest.position;
		const memberPosition = member.value.roles.highest.position;

		if (!member.value.kickable || authorPosition <= memberPosition) {
			return message.sendTranslated(
				"global:highererr",
				[{
					func: "kick",
					type: "member"
				}]
			);
		}
		let reason;
		const parseReason = await args.restResult("string")
		if (parseReason.value !== undefined) {
			if (parseReason.value.length > 262) {
				return message.sendTranslated(
					"global:toolong",
					[{
						arg: "reason",
						chars: 262
					}]
				);
			}
			reason = ` | ${reason.value}`;
		} else {
			reason = "";
		}
		member.value
			.kick({reason: `BY ${message.author.username}${reason}`})
			.then((member) => {
				message.sendTranslated(
					"commands:moderation.kick.kicked",
					[{member: `<@${member.value.id}>`}]
				);
			});
	}
}
