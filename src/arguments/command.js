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
const globby = require("globby");

module.exports = class ClientArgument extends Argument {
	constructor(context) {
		super(context, {name: "command"});
	}

	async parseLoaded(argument) {
		const command = this.client.commands.get(argument);
		return command ?? undefined;
	}

	async getCommand(path) {
		delete require.cache[require.resolve(path)];
		const loaded = await this.client.commands.load(path);
		return loaded.next();
	}

	async parseFiles(argument) {
		if (this.client.commands.has(argument)) {
			return undefined;
		}
		const files = await globby(
			`commands/**/${argument}.js`,
			{absolute: true}
		);
		const path = files[0];
		const command = path ? await this.getCommand(path) : undefined;
		return command ? command.value : undefined;
	}

	async run(argument, context) {
		const command = await this.parseLoaded(argument)
			?? await this.parseFiles(argument);

		return command ? this.ok(command) : this.error(
			argument,
			"ArgumentCommandUnknownCommand",
			"The argument did not resolve to a command."
		);
	}
}
