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

module.exports = class ClientCommand extends Command {
	constructor(context) {
		super(context, {
			name: "set",
			description: "commands:core.set.description",
			preconditions: ["GuildOnly", "serverowner"]
		});
	}

	async run(message, args) {
		const guild = await message.client.settings.guild(message.guild.id);
		const key = await args.pickResult("string");
		const val = await args.repeatResult("string");

		if (key.value !== undefined && val.value !== undefined) {
			guild.set(key.value, val.value.join(" "));
			await guild.save();
			return await message.sendTranslated("commands:core.set.updated", [{
				key: key.value,
				val: val.value.join(" ")
			}]);
		}
		let out;
		out += "```md"
		for (const [key, value] of Object.entries(guild.toObject())) {
			out += `\n[ ${key} ][ ${value} ]`
		}
		out += "```"
		return await message.channel.send(out);
	}
};
