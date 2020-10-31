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
const { Collection, MessageEmbed, Permissions } = require("discord.js");

const EMBED_PERMS = new Permissions([
	Permissions.FLAGS.EMBED_LINKS
]);
const time = 1000 * 60 * 3;

module.exports = class ClientCommand extends SyrusCommand {
	constructor(context) {
		super(context, {
			aliases: ["commands", "cmd", "cmds"],
			description: "core:help.description"
		});
	}

	async run(message, args) {
		const command = await args.pickResult("command");
		if (command.success) {
			return message.channel.send(
				await this.buildCommandEmbed(message, command.value)
			);
		}
		const category = await args.start().pickResult("category");
		const individual = category.success;
		const categories = individual ? [category.value] : undefined;
		const canEmbed = message.channel.permissionsFor(this.client.user)
			.has(EMBED_PERMS);
		const display = await this.buildHelp(message, categories, individual);
		if (!canEmbed) {
			try {
				await message.author.send(display);
				await message.sendTranslated("core:help.dm");
			} catch {
				await message.sendTranslated("core:help.nodm");
			}
		}
		await message.channel.send(display);
	}


	async buildHelp(message, categories, individual) {
		const commands = await this.fetchCommands(message, categories);
		const prefix = await this.client.fetchPrefix(message);
		const format = this.formatCommand.bind(
			this,
			message,
			prefix,
			individual
		);
		const fields = await Promise.all(commands.map(async (category) => {
			const commandList = await Promise.all(
				category.map(async (command) => {
					const description = await message.fetchLanguageKey(
						command.description
					)
					return format(command, description)
				})
			);
			return {
				name: category.name,
				value: commandList.join(individual ? "\n" : ", "),
				inline: false
			}
		}));

		const allHelpDesc = `
				Hover over commands for more info (on PC), OR
				use \`${prefix}help [command|category]\` 
			`;
		const color = message.member.displayColor;
		const embedder = new MessageEmbed()
			.setTitle("Commands")
			.setDescription(
				individual ? "" : allHelpDesc
			)
			.setColor(color);
		return embedder.addFields(fields);
	}

	formatCommand(message, prefix, individual, command, description) {
		const normal = `• ${prefix}${command.name} → ${description}`;
		const link = `[\`${command.name}\`](https://syrus.gg "${description}")`;
		return individual ? normal : link;
	}

	async fetchCommands(message, category, prefix) {
		// TODO: make help only return commands the user has access to
		function getCategory(client, category) {
			return client.commands.fetchCategory(category);
		}
		const all = this.client.commands.categories;
		const fetch = getCategory.bind(this, this.client);
		return category ? category : all.map(fetch);
	}

	async buildCommandEmbed(message, command) {
		const description = await message.fetchLanguageKey(
			command.description
		);
		const toDetail = command.detailedDescription;
		const detailed = await message.fetchLanguageKey(toDetail);
		const extended = toDetail ? detailed : "";
		return new MessageEmbed()
			.setTitle(command.usage)
			.setDescription(
				`
					*"${description}"*
					${extended}
				`
			);
	}
};
