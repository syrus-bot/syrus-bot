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
		super(context, {name: "parserole"});
	}

	async parseID(argument, guild) {
		if (/^\d+$/.test(argument)) {
			return await guild.roles.fetch(argument)
				.catch({
					// noop
				});
		}
		return undefined;
	}

	async parseMention(argument, guild) {
		if (/^<@&!*\d+>$/.test(argument)) {
			return await this.parseID(argument
				.replace("<@&", "")
				.replace("!", "")
				.replace(">", ""),
				guild
			);
		}
		return undefined;
	}

	async parseQuery(argument, guild) {
		const role = await guild.roles.cache
            .find((role) => {
                return role.name.toLowerCase() === argument.toLowerCase()
            });
		return role ? role : undefined

	}

	async run(argument, context) {
		const { guild } = context.message;
		if (!guild) {
			return this.error(
				argument,
				'ArgumentRoleMissingGuild',
				'The argument must be run on a guild.'
			);
		}

		const role = await this.parseID(argument, guild)
			?? await this.parseMention(argument, guild)
			?? await this.parseQuery(argument, guild);

		return role ? this.ok(role) : this.error(
			argument,
			'ArgumentRoleUnknownRole',
			'The argument did not resolve to a role.'
		);
	}
}