const SyrusCommand = require("@struct/SyrusCommand");
const { PermissionsPrecondition } = require("@sapphire/framework");
const { Permissions } = require("discord.js");

module.exports = class ClientCommand extends SyrusCommand {
	constructor(context) {
		super(context, {
			name: "ban",
			description: "moderation:ban.description",
			preconditions: [
				"GuildOnly",
				new PermissionsPrecondition(Permissions.FLAGS.BAN_MEMBERS)
			]
		});
	}

	async run(message, args) {
		const member = await args.pickResult("member");
		if (!member.success) {
			return message.replyTranslated(
				"global:notfound",
				[{type: "member"}]
			);
		}

		const authorPosition = message.member.roles.highest.position;
		const memberPosition = member.value.roles.highest.position;

		if (!member.value.bannable || authorPosition <= memberPosition) {
			return message.replyTranslated(
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
				return message.replyTranslated(
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
				message.replyTranslated(
					"moderation:ban.banned",
					[{member: `<@${member.value.id}>`}]
				);
			});
	}
};
