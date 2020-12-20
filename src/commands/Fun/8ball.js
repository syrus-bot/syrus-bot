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
const { MessageEmbed } = require("discord.js");
const ANSWERS = [
	"It is certain.",
	"It is decidedly so.",
	"Without a doubt.",
	"Yes, definitely.",
	"You may rely on it.",
	"As I see it, yes.",
	"Most likely.",
	"Outlook good.",
	"Yes.",
	"Signs point to yes.",
	"Don't count on it.",
	"My reply is no.",
	"My sources say no.",
	"Outlook not so good.",
	"Very doubtful.",
	"Reply hazy, try again.",
	"Ask again later.",
	"Better not tell you now.",
	"Cannot predict now.",
	"Concentrate and ask again."
];

module.exports = class ClientCommand extends SyrusCommand {
	constructor(context) {
		super(context, {
			name: "8ball",
			aliases: ["eightball", "magic8ball"],
			description: "fun:8ball.description"
		});
	}

	async run(message, args) {
		const question = await args.restResult("string");
		if (!question.success) {
			return message.channel.send(
				new MessageEmbed()
					.setColor("#F04947")
					.setTitle(await message.fetchLanguageKey(
						"fun:8ball.no-q-err.title"
					))
					.setDescription(await message.fetchLanguageKey(
						"fun:8ball.no-q-err.description"
					))
			)
		}
		const answer = ANSWERS[Math.floor(Math.random() * ANSWERS.length)];
		message.channel.send(
			new MessageEmbed()
				.setColor("#57309D")
				.setTitle("Magic 8 Ball")
				.setDescription(`**Question:** \`${question.value}\`\n**Answer:** \`${answer}\``)
		);
	}
}
