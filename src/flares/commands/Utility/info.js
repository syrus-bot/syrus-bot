const SyrusCommand = require("@struct/SyrusCommand");
const { MessageEmbed } = require("discord.js");

const FLAG_EMOJIS = {
	"DISCORD_EMPLOYEE": "<:staff_badge:755961572945559612>",
	"PARTNERED_SERVER_OWNER": "<:new_partner_badge:755961572773331054>",
	"HYPESQUAD_EVENTS": "<:hypesquad_badge:755961573268521071>",
	"BUGHUNTER_LEVEL_1": "<:bughunter:741523547708588105>",
	"HOUSE_BRAVERY": "<:bravery_badge:755961573415190638>",
	"HOUSE_BRILLIANCE": "<:brilliance_badge:755961572546838601>",
	"HOUSE_BALANCE": "<:balance_badge:755961572748427364>",
	"EARLY_SUPPORTER": "<:early_supporter_badge:755970816243400704>",
	"TEAM_USER": "",
	"SYSTEM": "<:system:755969660809117706>",
	"BUGHUNTER_LEVEL_2": "<:goldbughunter:741523547880685588>",
	"VERIFIED_BOT": "<:verified_bot:755969137448190103>",
	/* eslint-disable-next-line max-len */
	"EARLY_VERIFIED_BOT_DEVELOPER": "<:verified_developer_badge:755961573561991198>",
	// DEPRECATED, TODO: remove in next discord.js release
	"EARLY_VERIFIED_DEVELOPER": "",
	"VERIFIED_DEVELOPER": "<:verified_developer_badge:755961573561991198>",
	"DISCORD_PARTNER": "<:new_partner_badge:755961572773331054>"
};

module.exports = class ClientCommand extends SyrusCommand {
	constructor(context) {
		super(context, {
			name: "info",
			aliases: ["i", "lookup"],
			description: "utilities:info.description",
			preconditions: ["GuildOnly"]
		});
		this.time = {
			hourCycle: "h24",
			timeZone: "UTC",
			timeZoneName: "short",
			year: "numeric",
			month: "2-digit",
			day: "2-digit",
			hour: "2-digit",
			minute: "2-digit"
		};
	}

	async parseFlags(flags) {
		let toParse;
		toParse = flags.toArray().join(" ");
		for (const [key, value] of Object.entries(FLAG_EMOJIS)) {
			toParse = toParse.replace(key, value);
		}
		return toParse;
	}

	field(values) {
		return {name: values[0], value: values[1], inline: values[2] ?? true};
	}

	async buildEmbed(target, isMember) {
		const user = target.user;
		const url = user.avatarURL({format: "png", dynamic: true});
		const flags = await this.parseFlags(user.flags);
		let fields;
		fields = Array.from([
			["Account Age", user.createdAt.toLocaleString("en-GB", this.time)],
			["User Badges", flags ? flags : "None"]
		], this.field);
		const embed = new MessageEmbed()
			.setAuthor(
				`${user.username}#${target.user.discriminator}`, url
			)
			.addFields(fields)
			.setThumbnail(url)
			.setFooter(`User ID: ${target.user.id}`);
		if (isMember) {
			const roles = Array.from(target.roles.cache.filter(
				(role) => role.name !== "@everyone"
			), (role) => `${role[1]}`);
			fields = Array.from([
				["Roles", roles.length ? roles.join(" ") : "N/A", false],
				[
					"Joined At",
					target.joinedAt.toLocaleString("en-GB", this.time)
				],
				["Nickname", target.displayName]
			], this.field);
			embed
				.addFields(fields)
				.setColor(target.displayHexColor);
		}
		return embed;
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
		message.channel.send(await this.buildEmbed(target, isMember));
	}
};
