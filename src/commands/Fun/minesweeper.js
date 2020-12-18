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
const Minesweeper = require("discord.js-minesweeper");
const { MessageEmbed } = require("discord.js")

async function genGame(difficulty) {
	if (!difficulty || difficulty > 3 || difficulty < 1 || isNaN(difficulty)) {
		return "Missing difficulty (1-3)";
	}
	let gameOptions;
	if (Number(difficulty) === 1) {
		gameOptions = "9x9x10";
	}
	if (Number(difficulty) === 2) {
		gameOptions = "14x14x40";
	}
	if (Number(difficulty) === 3) {
		gameOptions = "22x22x99";
	}
	gameOptions = gameOptions.split("x");
	const minesweeper = new Minesweeper({
		rows: Number(gameOptions[0]),
		columns: Number(gameOptions[1]),
		mines: Number(gameOptions[2]),
		spaces: false
	});
	let startedGame;
	let splitMessages;
	let splitIndex;

	startedGame = minesweeper.start();

	if (startedGame.length <= 1900) {
		return startedGame;
	}

	splitMessages = [];
	do {
		splitIndex = startedGame.substring(0, 1900).lastIndexOf("\n");
		splitMessages.push(startedGame.substring(0, splitIndex));
		startedGame = startedGame.substring(splitIndex + 1);
	} while (startedGame.length > 1900)
	splitMessages.push(startedGame);

	return splitMessages;
}

module.exports = class ClientCommand extends SyrusCommand {
	constructor(context) {
		super(context, {
			name: "minesweeper",
			description: "fun:minesweeper.description"
		});
	}

	async run(message, args) { // eslint-disable-line max-lines-per-function
		let difficultyChoice;
		const choiceMessage = await message.channel.send(
			new MessageEmbed()
				.setTitle(await message.fetchLanguageKey(
					"fun:minesweeper.embed.title"
				))
				.setDescription(await message.fetchLanguageKey(
					"fun:minesweeper.embed.description"
				))
				.addField(
					await message.fetchLanguageKey(
						"fun:minesweeper.embed.easy.title"
					),
					await message.fetchLanguageKey(
						"fun:minesweeper.embed.easy.description"
					)
				)
				.addField(
					await message.fetchLanguageKey(
						"fun:minesweeper.embed.hard.title"
					),
					await message.fetchLanguageKey(
						"fun:minesweeper.embed.hard.description"
					)
				)
				.addField(
					await message.fetchLanguageKey(
						"fun:minesweeper.embed.expert.title"
					),
					await message.fetchLanguageKey(
						"fun:minesweeper.embed.expert.description"
					)
				)
		).then(async (msg) => {
			await msg.react("🇦");
			await msg.react("🇧");
			await msg.react("🇨");

			const filter = (reaction, user) => { // eslint-disable-line func-style
				return ["🇦", "🇧", "🇨"].includes(
					reaction.emoji.name
				) && user.id === message.author.id;
			};

			msg.awaitReactions(filter, {
				max: 1,
				time: 20000,
				errors: ["time"]
			})
				.then((collected) => {
					const reaction = collected.first();
					console.log(collected)

					if (reaction.emoji.name === "🇦") {
						difficultyChoice = 1;
						msg.delete();
					}
					if (reaction.emoji.name === "🇧") {
						difficultyChoice = 2;
					}
					if (reaction.emoji.name === "🇨") {
						difficultyChoice = 3;
					}
					msg.reactions.removeAll();
					msg.edit(
						message.fetchLanguageKey("fun:minesweeper.generating")
					);


				})
				.catch((collected) => {
					return msg.reactions.removeAll();
				})
		});
	}
}

/* const game = await genGame(difficultyChoice);
					   if (!Array.isArray(game)) {
					   	return await msg.edit(game);
					   } else {
					   	let i = 1;
					   	await msg.edit(game[0]);
					   	function sendMessages() {
					   		if (i < game.length) message.channel.send(game[i++]).then(sendMessages);
					   	};
					   	sendMessages();
					   	return;
					   };  */
