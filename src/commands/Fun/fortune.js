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
const { Args, CommandOptions } = require("@sapphire/framework");
const got = require("got");
const { MessageEmbed } = require("discord.js")

async function getFortune() {
	const response = await got(
		"https://fortunecookieapi.herokuapp.com/v1/cookie", {
			headers: {
				"user-agent": "Syrus Discord Bot"
			}
		}
	);
	const json = await JSON.parse(response.body);
	return json[0];
}


module.exports = class ClientCommand extends SyrusCommand {
	constructor(context) {
		super(context, {
			name: "fortune",
			aliases: ["fortunecookie"],
			description: "fun:fortune.description"
		});
	}

	async run(message, args) {
		const fetched = await getFortune();
		const randomTime = Math.floor(Math.random() * 1500);
		const openingMessage = await message.channel.send(
			new MessageEmbed()
				.setTitle("🥠 Your Fortune Cookie")
				.setDescription("**Opening...**")
				.setColor("#EA8D27")
		);
		setTimeout(async () => {
			return await openingMessage.edit(
				new MessageEmbed()
					.setTitle("🥠 Your Fortune Cookie")
					.addField("Fortune", `***[${fetched.fortune.message}](https://syrus.gg)***`, false)
					.addField(`Learn Chinese - "${fetched.lesson.english}"`, `${fetched.lesson.chinese} *(${fetched.lesson.pronunciation})*`, false)
					.addField("Lucky Numbers", `${fetched.lotto.numbers.join(", ")}`)
					.setColor("#EA8D27")
			);
		}, randomTime);
	}
}
