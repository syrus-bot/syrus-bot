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

const { Args, Command, CommandOptions } = require("@sapphire/framework");
const { Permissions } = require("discord.js");

module.exports = class ClientCommand extends Command {
	constructor(context) {
		super(context, {
			name: "ban",
			description: "commands:moderation.ban.description",
			preconditions: ["GuildOnly", {entry: "permissions", context: {
				permissions: new Permissions(Permissions.FLAGS.BAN_MEMBERS)
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
		
		if (!member.value.bannable || authorPosition <= memberPosition) {
			return message.sendTranslated(
				"global:highererr", 
				[{
					func: "ban",
					type: "member"
				}]
			);
		}
		let reason = await args.restResult("string");
		if (reason.value !== undefined) {
			if (reason.value.length > 262) {
				return msg.sendTranslated(
					"global:toolong", 
					[{
						arg: "reason",
						chars: 262
					}]
				);
			}
		} else {
			let reason = " | ${reason.value}";
		}
		member.value
			.ban({reason: `BY ${message.author.username} ${reason}`})
			.then((member) => {
				message.sendTranslated(
					"commands:moderation.ban.banned", 
					[{member: `<@${member.value.id}>`}]
				);
			});
	}
}