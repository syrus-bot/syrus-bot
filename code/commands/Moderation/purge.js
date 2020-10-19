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
			name: "purge",
			aliases: ["cleanup", "prune"],
			description: "commands:moderation.purge.description",
			preconditions: ["GuildOnly", {entry: "permissions", context: {
				permissions: new Permissions(Permissions.FLAGS.MANAGE_MESSAGES)
			}}]
		});
	}

	async run(message, args) {
		const amount = await args.pickResult("integer");
		if (amount.value === undefined) {
			amount.value = 1;
		}
		await message.delete();
		const messages = await message.channel.messages
			.fetch({limit: amount.value});
		await message.channel.bulkDelete(messages)
		const finishedMessage = await message.sendTranslated(
			"commands:moderation.purge.purged",
			[{amount: amount.value}]
		)

		setTimeout(() => {
			finishedMessage.delete();
		}, 3000);
	}
}
