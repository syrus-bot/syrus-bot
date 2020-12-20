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

function owoify(message) {
	const splitted = message
		.replace(/(?:r|l)/g, "w")
		.replace(/(?:R|L)/g, "W")
		.replace(/(n)([aeiou])/gi, "$1y$2") // eslint-disable-line prefer-named-capture-group
		.replace(/ove/g, "uv")
		.replace(/th/g, "ff")
		.replace(/@/g, "@\u200b");
	return splitted;
}


module.exports = class ClientCommand extends SyrusCommand {
	constructor(context) {
		super(context, {
			name: "owoify",
			aliases: ["owo", "owoifier"],
			description: "fun:owoify.description"
		});
	}

	async run(message, args) {
		const messageToOwoify = await args.restResult("string");
		if (!messageToOwoify.success) {
			return message.channel.send(
				await message.fetchLanguageKey("fun:owoify.no-msg-err")
			);
		}
		return message.channel.send(owoify(messageToOwoify.value));
	}
}
