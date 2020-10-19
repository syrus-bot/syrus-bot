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

const { Constants, DiscordAPIError, GuildMember } = require("discord.js");
const { Argument } = require("@sapphire/framework");

module.exports = class ClientArgument extends Argument {
	constructor(context) {
		super(context, {name: "parsemember"});
	}

	async parseID(argument, guild) {
		if (/^\d+$/.test(argument)) {
			try {
				return await guild.members.fetch(argument)
			} catch {
				// noop
			}
		}
		return undefined;
	}

	async parseMention(argument, guild) {
		if (/^<@!*\d+>$/.test(argument)) {
			return await this.parseID(argument
				.replace("<@", "")
				.replace("!", "")
				.replace(">", ""),
			guild
			);
		}
		return undefined;
	}

	async parseQuery(argument, guild) {
		const member = await guild.members.fetch({
			query: argument,
			limit: 1
		})

		return member.values().next().value
	}

	async run(argument, context) {
		const { guild } = context.message;
		if (!guild) {
			return this.error(
				argument,
				"ArgumentMemberMissingGuild",
				"The argument must be run on a guild."
			);
		}

		const member = await this.parseID(argument, guild)
			?? await this.parseMention(argument, guild)
			?? await this.parseQuery(argument, guild);

		return member ? this.ok(member) : this.error(
			argument,
			"ArgumentMemberUnknownMember",
			"The argument did not resolve to a member."
		);
	}
}
