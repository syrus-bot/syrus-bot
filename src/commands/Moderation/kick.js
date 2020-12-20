const SyrusCommand = require("../../lib/structures/SyrusCommand");
const { Permissions } = require("discord.js");

module.exports = class ClientCommand extends SyrusCommand {
	constructor(context) {
		super(context, {
			name: "kick",
			description: "moderation:kick.description",
			preconditions: ["GuildOnly", {entry: "Permissions", context: {
				permissions: new Permissions(Permissions.FLAGS.KICK_MEMBERS)
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

		if (!member.value.kickable || authorPosition <= memberPosition) {
			return message.sendTranslated(
				"global:highererr",
				[{
					func: "kick",
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
			.kick({reason: `BY ${message.author.username}${reason}`})
			.then((member) => {
				message.sendTranslated(
					"moderation:kick.kicked",
					[{member: `<@${member.value.id}>`}]
				);
			});
	}
}
