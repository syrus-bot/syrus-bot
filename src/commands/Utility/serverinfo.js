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
const { MessageEmbed } = require("discord.js");

module.exports = class ClientCommand extends Command {
	constructor(context) {
		super(context, {
			name: "serverinfo",
			aliases: ["sinfo", "server", "si"],
			description: "commands:utilities.serverinfo.description",
			preconditions: ["GuildOnly"]
		});
	}

	async run(message) {
		const {guild} = message;
		const owner = await guild.members.fetch(guild.ownerID);
		message.channel.send(
			new MessageEmbed()
				.setColor("#4287f5")
				.setTitle(`About ${guild.name}`)
				.addField("Server Owner", `${owner.user.username}#${owner.user.discriminator}\n(${owner.displayName})`, true)
				.addField("Boost Status", `<:boost:763412360433369168> Level ${guild.premiumTier}\n(${guild.premiumSubscriptionCount} boosts)`, true)
				.addField(
					"Members",
					`
						${guild.memberCount} total
					`,
					true
				)
				.addField(
					"Stats",
					`
						<:textchannel:763412308780908555> ${guild.channels.cache.filter((channel) => channel.type === "text").size} text channel(s)
						<:voicechannel:763412288668827728> ${guild.channels.cache.filter((channel) => channel.type === "voice").size} voice channel(s)
						<:emoji:763412234218766337> ${guild.emojis.cache.size} emoji(s)
						<:members:763412258235482153> ${guild.roles.cache.size} role(s)
					`,
					true
				)
				.addField(
					"Settings",
					`
						<:greencheck:741524095547736064> Verification: ${guild.verificationLevel.toLowerCase()}
						<:greencheck:741524095547736064> Filter: ${guild.explicitContentFilter.toLowerCase()}
						<:greencheck:741524095547736064> Region: ${guild.region}
						<:greencheck:741524095547736064> 2FA: ${guild.mfaLevel}
					`,
					true
				)
				.setThumbnail(guild.iconURL({format: "png", dynamic: true}))
				.setFooter(`Guild ID: ${guild.id} | Owner ID: ${owner.id}`)
		);
	}
};
