const SyrusCommand = require("@struct/SyrusCommand");
const { PermissionsPrecondition } = require("@sapphire/framework");
const { Permissions } = require("discord.js");

module.exports = class ClientCommand extends SyrusCommand {
	constructor(context) {
		super(context, {
			name: "role",
			aliases: ["r", "ro"],
			description: "utilities:role.description",
			preconditions: [
				"GuildOnly",
				new PermissionsPrecondition(Permissions.FLAGS.MANAGE_ROLES)
			]
		});
	}

	async run(message, args) {
		const memberParse = await args.pickResult("member");
		if (!memberParse.success) {
			return message.replyTranslated(
				"global:notfound",
				[{type: "member"}]
			);
		}
		const roleParse = await args.pickResult("role");
		if (!roleParse.success) {
			return message.replyTranslated(
				"global:notfound",
				[{type: "role"}]
			);
		}
		const member = memberParse.value;
		const role = roleParse.value;
		if (!role.editable || member.roles.highest.position <= role.position) {
			return message.replyTranslated(
				"global:highererr",
				[{
					func: "grant or remove",
					type: "role"
				}]
			);
		}
		if (member.roles.cache.has(role.id)) {
			member.roles.remove(role.id).then((ok) => {
				message.replyTranslated(
					"utilities:role.removed",
					[{
						role: role.name,
						user: `${member.user.username}#${member.user.discriminator}`
					}]
				);
			});
		} else {
			member.roles.add(role.id).then((ok) => {
				message.replyTranslated(
					"utilities:role.added",
					[{
						role: role.name,
						user: `${member.user.username}#${member.user.discriminator}`
					}]
				);
			});
		}
	}
};
