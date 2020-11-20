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
const { Timestamp } = require("@sapphire/time-utilities");
const { MessageEmbed } = require("discord.js");

module.exports = class ClientCommand extends SyrusCommand {
	constructor(context) {
		super(context, {
			name: "np",
			aliases: ["nowplaying", "song", "track"],
			description: "music:np.description"
		});
	}

	async run(message, args) {
		const queue = this.client.music.queues.get(message.guild.id);
		if (!queue.player.playing) {
			return message.sendTranslated("music:np.nothing");
		}
		const currentObject = await queue.current();
		const identifier = currentObject.track;
		const resolved = await this.client.music.decode(identifier);
		const formatter = new Timestamp("HH:mm:ss");
		const position = formatter.displayUTC(currentObject.position);
		const live = resolved.isStream;
		const duration = live ? "LIVE" : formatter.displayUTC(resolved.length);

		const embed = new MessageEmbed()
			.setTitle(await message.fetchLanguageKey("music:playing"))
			.setDescription(
				`**[${resolved.author} | ${resolved.title}](${resolved.uri})**`
			)
			.addField(
				await message.fetchLanguageKey("music:np.time"),
				`${position} / ${duration}`,
				true
			)

		/*
			TODO: Add information about who requested the song,
			and the thumbnail
		*/
		return message.channel.send(embed)
	}
};
