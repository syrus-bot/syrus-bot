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
const util = require("util")

module.exports = class ClientCommand extends Command {
	constructor(context) {
		super(context, {
			name: "eval",
			description: "commands:core.eval.description",
			preconditions: ["owner"],
			quotes: []
		});
	}

	async run(message, args) {
		const tokenRegex = new RegExp(`${this.client.token.split("").join("[^]{0,2}")}|${this.client.token.split("").reverse()
			.join("[^]{0,2}")}`)
		function clean(text) {
			if (typeof text === "string") {
				return text.replace(/`/g, `\`${String.fromCharCode(8203)}`).replace(/@/g, `@${String.fromCharCode(8203)}`)
					.replace(tokenRegex, "[TOKEN]");
			}
			return text;

		}

		try {
			const code = await args.restResult("string");
			const evaled = util.inspect(eval(code.value));
			message.channel
				.send(clean(evaled), {code: "xl"})
				.catch(() => {
					message.channel.send(
						"`OUTPUT WAS TOO LONG TO DISPLAY IN DISCORD, "
						+ "REDIRECTING TO CONSOLE.`"
					);
					console.log(evaled);
				});
		} catch (err) {
			message.channel.send(`\`ERROR\` \`\`\`xl\n${clean(err)}\n\`\`\``);
		}

	}
}
