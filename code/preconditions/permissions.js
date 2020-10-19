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

const { Precondition, UserError } = require("@sapphire/framework");
const { Permissions } = require("discord.js");

module.exports = class ClientPrecondition extends Precondition {
	constructor(...args) {
		super(...args);
		this.dm = new Permissions([
			Permissions.FLAGS.VIEW_CHANNEL,
			Permissions.FLAGS.SEND_MESSAGES,
			Permissions.FLAGS.SEND_TTS_MESSAGES,
			Permissions.FLAGS.EMBED_LINKS,
			Permissions.FLAGS.ATTACH_FILES,
			Permissions.FLAGS.READ_MESSAGE_HISTORY,
			Permissions.FLAGS.MENTION_EVERYONE,
			Permissions.FLAGS.USE_EXTERNAL_EMOJIS,
			Permissions.FLAGS.ADD_REACTIONS
		]);
	}

	run(message, command, context) {
		const required = context.permissions;
		const clientPermissions = message.channel.permissionsFor(
			this.client.id
		);
		const authorPermissions = message.channel.permissionsFor(
			message.author.id
		);

		const myPermissions = message.guild ? clientPermissions : this.dm;
		const theirPermissions = message.guild ? authorPermissions : this.dm;
		const imMissing = myPermissions.missing(required);
		const wereMissing = theirPermissions.missing(required);

		const missingAny = imMissing.length === 0 && wereMissing.length === 0;
		return missingAny ? this.ok() : this.error(
			this.name,
			"The bot or user is missing permissions to run this command."
		);
	}
}
