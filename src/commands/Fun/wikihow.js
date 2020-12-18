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
const config = require("../../config.json");
const got = require("got");
const { MessageEmbed, MessageAttachment } = require("discord.js")

async function getWikiHow() {
	const response = await got(
		"https://api.ksoft.si/images/random-wikihow", {
			headers: {
				"Authorization": `Bearer ${config.tokens.ksoftsi}`
			}
		}
	);
	const json = await JSON.parse(response.body);
	return json;
}


module.exports = class ClientCommand extends SyrusCommand {
	constructor(context) {
		super(context, {
			name: "wikihow",
			aliases: ["randomwiki"],
			description: "fun:wikihow.description"
		});
	}

	async run(message, args) {
		const fetched = await getWikiHow();
		const image = new MessageAttachment(fetched.url, `${message.author.username}_ran_this_command_from_Syrus.png`);
		return message.channel.send(
			new MessageEmbed()
				.setTitle(`From Article: __${fetched.title}__`)
				.setURL(fetched.article_url)
				.setDescription(`[Visit the article here](${fetched.article_url})`)
				.attachFiles(image)
				.setImage(`attachment://${message.author.username}_ran_this_command_from_Syrus.png`)
				.setColor("#4353E0")
		);
	}
}
