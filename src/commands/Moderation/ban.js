const SyrusCommand = require("../../lib/structures/SyrusCommand");
const { Permissions } = require("discord.js");

module.exports = class ClientCommand extends SyrusCommand {
	constructor(context) {
		super(context, {
			name: "ban",
			description: "moderation:ban.description",
			preconditions: ["GuildOnly", {entry: "Permissions", context: {
				permissions: new Permissions(Permissions.FLAGS.BAN_MEMBERS)
			}}]
		});
	}

	async run(message, args) {
		const member = await args.pickResult("member");
		if (!member.success) {
			return message.sendTranslated(
				"global:notfound",
				[{type: "member"}]
			);
		}

		const authorPosition = message.member.roles.highest.position;
		const memberPosition = member.value.roles.highest.position;

		if (!member.value.bannable || authorPosition <= memberPosition) {
			return message.sendTranslated(
				"global:highererr",
				[{
					func: "ban",
					type: "member"
				}]
			);
		}
		let reason;
		const parseReason = await args.restResult("string");
		if (parseReason.value !== undefined) {
			if (parseReason.value.length > 262) {
				return message.sendTranslated(
					"global:toolong",
					[{
						arg: "reason",
						chars: 262
					}]
				);
			}
			reason = ` | ${parseReason.value}`;
		} else {
			reason = "";
		}
		member.value
			.ban({reason: `BY ${message.author.username}${reason}`})
			.then((member) => {
				message.sendTranslated(
					"moderation:ban.banned",
					[{member: `<@${member.value.id}>`}]
				);
			});
	}
}
