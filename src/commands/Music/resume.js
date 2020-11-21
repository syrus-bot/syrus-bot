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

module.exports = class ClientCommand extends SyrusCommand {

	constructor(context) {
		super(context, {
			name: "resume",
			aliases: ["unpause"],
			description: "music:resume.description"
		});
	}

	async run(message, args) {
		const player = this.client.music.queues.get(message.guild.id).player;
		if (player.paused) {
			await player.pause(false);
			return message.sendTranslated("music:resume.resumed");
		}
		return message.sendTranslated("music:resume.already");
	}
};
