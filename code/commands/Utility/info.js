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
const { MessageEmbed, SnowflakeUtil } = require("discord.js");

module.exports = class ClientCommand extends Command {
	constructor(context) {
		super(context, {
			name: "info",
			aliases: ["i", "lookup"],
			description: "commands:utilities.info.description",
			preconditions: ["GuildOnly"]
		});
	}

	async run(message, args) {
		const member = await args.pickResult("parsemember");
		let target;
		let ismemb;
		if (member.success) {
			target = member.value;
			ismemb = true;
		} else {
			const user = await args.pickResult("user");
			if (user.success) {
				target = {user: user.value};
				ismemb = false;
			} else {
				target = message.member;
				ismemb = true;
			}
		}
		
		const format = {
			hourCycle: "h24",
			timeZone: "UTC",
			timeZoneName: "short",
			year: "numeric",
			month: "2-digit",
			day: "2-digit",
			hour: "2-digit",
			minute: "2-digit"
		}
		const url = target.user.avatarURL({format: "png", dynamic: true})
		
		const embed = new MessageEmbed()
				.setAuthor(`${target.user.username}#${target.user.discriminator}`, url)
				.addField("Account Age", target.user.createdAt.toLocaleString("en-GB", format), true)
				.addField(
					"User Badges",
					`${
						target.user.flags.toArray().join(" ")
							.replace(/\,/gi, " ")
							.replace("DISCORD_EMPLOYEE", "<:staff_badge:755961572945559612>")
							.replace("DISCORD_PARTNER", "<:new_partner_badge:755961572773331054>")
							.replace("HYPESQUAD", "<:hypesquad_badge:755961573268521071>")
							.replace(/BUG_HUNTER_LEVEL_1|BUG_HUNTER_LEVEL_2/, "<:bug_hunter_badge:755961572454694914>")
							.replace("HOUSE_BRILLIANCE", "<:brilliance_badge:755961572546838601>")
							.replace("HOUSE_BRAVERY", "<:bravery_badge:755961573415190638>")
							.replace("HOUSE_BALANCE", "<:balance_badge:755961572748427364>")
							.replace("EARLY_VERIFIED_DEVELOPER", "")
							.replace("VERIFIED_DEVELOPER", "<:verified_developer_badge:755961573561991198>")
							.replace("VERIFIED_BOT", "<:verified_bot:755969137448190103>")
							.replace("SYSTEM", "<:system:755969660809117706>")
							.replace("EARLY_SUPPORTER", "<:early_supporter_badge:755970816243400704>") || "None"
					}`, true)
				.setThumbnail(url)
				.setFooter(`User ID: ${target.user.id}`)
		
		if (ismemb) {
			embed
				.addField("Roles",
				Array.from(
					target.roles.cache.values(), 
					role => {if (role.name === "@everyone") return; return `<@&${role.id}>`;}
				).join(" "), false)
				.addField("Joined At", target.joinedAt.toLocaleString("en-GB", format), true)
				.addField("Nickame", target.displayName, true)
				.setColor(target.displayHexColor)
		}
		message.channel.send(embed)
	}
};