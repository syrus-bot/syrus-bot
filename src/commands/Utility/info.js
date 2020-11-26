const SyrusCommand = require("../../lib/structures/SyrusCommand");
const { Args, CommandOptions } = require("@sapphire/framework");
const { MessageEmbed, SnowflakeUtil } = require("discord.js");

module.exports = class ClientCommand extends SyrusCommand {
	constructor(context) {
		super(context, {
			name: "info",
			aliases: ["i", "lookup"],
			description: "utilities:info.description",
			preconditions: ["GuildOnly"]
		});
		this.format = {
			hourCycle: "h24",
			timeZone: "UTC",
			timeZoneName: "short",
			year: "numeric",
			month: "2-digit",
			day: "2-digit",
			hour: "2-digit",
			minute: "2-digit"
		}
	}

	async parseFlags(flags) {
		return flags.toArray().join(" ")
			.replace("DISCORD_EMPLOYEE", "<:staff_badge:755961572945559612>")
			.replace(
				"DISCORD_PARTNER",
				"<:new_partner_badge:755961572773331054>"
			)
			.replace(
				"PARTNERED_SERVER_OWNER",
				""
			)
			.replace("HYPESQUAD_EVENTS", "")
			.replace("HYPESQUAD", "<:hypesquad_badge:755961573268521071>")
			.replace("BUGHUNTER_LEVEL_1", "<:bughunter:741523547708588105>")
			.replace(
				"BUGHUNTER_LEVEL_2",
				"<:goldbughunter:741523547880685588>"
			)
			.replace(
				"HOUSE_BRILLIANCE",
				"<:brilliance_badge:755961572546838601>"
			)
			.replace("HOUSE_BRAVERY", "<:bravery_badge:755961573415190638>")
			.replace("HOUSE_BALANCE", "<:balance_badge:755961572748427364>")
			.replace("EARLY_VERIFIED_DEVELOPER", "")
			.replace(
				"VERIFIED_DEVELOPER",
				"<:verified_developer_badge:755961573561991198>"
			)
			.replace("VERIFIED_BOT", "<:verified_bot:755969137448190103>")
			.replace("SYSTEM", "<:system:755969660809117706>")
			.replace(
				"EARLY_SUPPORTER",
				"<:early_supporter_badge:755970816243400704>"
			)
	}

	async buildEmbed(target, isMember) {
		const url = target.user.avatarURL({format: "png", dynamic: true})
		const flags = await this.parseFlags(target.user.flags);
		const embed = new MessageEmbed()
			.setAuthor(
				`${target.user.username}#${target.user.discriminator}`,
				url
			)
			.addField(
				"Account Age",
				target.user.createdAt.toLocaleString("en-GB", this.format),
				true
			)
			.addField(
				"User Badges",
				`${flags ? flags : "None"}`,
				true
			)
			.setThumbnail(url)
			.setFooter(`User ID: ${target.user.id}`)
		if (isMember) {
			embed
				.addField(
					"Roles",
					Array.from(
						target.roles.cache.values(),
						(role) => {
							if (role.name === "@everyone") {
								return;
							}
							return `<@&${role.id}>`;
						}
					).join(" "),
					false
				)
				.addField(
					"Joined At",
					target.joinedAt.toLocaleString("en-GB", this.format),
					true
				)
				.addField("Nickame", target.displayName, true)
				.setColor(target.displayHexColor)
		}
		return embed
	}

	async run(message, args) {
		const member = await args.pickResult("member");
		let target;
		let isMember;
		if (member.success) {
			target = member.value;
			isMember = true;
		} else {
			const user = await args.pickResult("user");
			if (user.success) {
				target = {user: user.value};
				isMember = false;
			} else {
				target = message.member;
				isMember = true;
			}
		}

		message.channel.send(await this.buildEmbed(target, isMember))
	}
};
