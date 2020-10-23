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

const { Constants, DiscordAPIError } = require("discord.js");
const { Argument } = require("@sapphire/framework");

module.exports = class ClientArgument extends Argument {
	constructor(context) {
		super(context, {name: "category"});
	}

	async parseCategory(argument) {
		const isCategory = this.client.commands.categories.includes(argument);
		const store = this.client.commands;
		return isCategory ? store.fetchCategory(argument) : undefined;
	}

	async run(argument, context) {
		const category = await this.parseCategory(argument);

		return category ? this.ok(category) : this.error(
			argument,
			"ArgumentCategoryUnknownCategory",
			"The argument did not resolve to a category."
		);
	}
}
