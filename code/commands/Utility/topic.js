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
const { Permissions } = require("discord.js");

module.exports = class ClientCommand extends Command {
	constructor(context) {
		super(context, {
			name: "topic",
			description: "commands:utilities.topic.description",
			preconditions: ["GuildOnly", {entry: "permissions", context: {
				permissions: new Permissions(Permissions.FLAGS.MANAGE_CHANNELS)
			}}]
		});
	}

	
	async run(message, args) {
		const topic = await args.restResult("string");
		let newtopic;
		if (topic.success) {
			newtopic = topic.value;
		} else {
			newtopic = ""
		}
		
		if (!message.channel.manageable) {
			return message.sendTranslated("global:missingperms");
		}
		
		message.channel
			.setTopic(newtopic)
			.then(() => {
				message.sendTranslated("commands:utilities.topic.changed", [{
					channel: message.channel.name,
					topic: newtopic || "[]"
				}]);
			});
	}
}