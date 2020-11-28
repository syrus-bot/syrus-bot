const SyrusCommand = require("../../lib/structures/SyrusCommand");
const { Args, CommandOptions } = require("@sapphire/framework");
const { Permissions } = require("discord.js");

module.exports = class ClientCommand extends SyrusCommand {
	constructor(context) {
		super(context, {
			name: "role",
			aliases: ["r", "ro"],
			description: "utilities:role.description",
			preconditions: ["GuildOnly", {entry: "permissions", context: {
				permissions: new Permissions(Permissions.FLAGS.MANAGE_ROLES)
			}}]
		});
	}

	async run(message, args) {
		const memberParse = await args.pickResult("member");
		if (!memberParse.success) {
			return message.sendTranslated(
				"global:notfound",
				[{type: "member"}]
			);
		}
		const roleParse = await args.pickResult("role");
		if (!roleParse.success) {
			return message.sendTranslated(
				"global:notfound",
				[{type: "role"}]
			);
		}
		const member = memberParse.value;
		const role = roleParse.value;
		if (!role.editable || member.roles.highest.position <= role.position) {
			return message.sendTranslated(
				"global:highererr",
				[{
					func: "grant or remove",
					type: "role"
				}]
			);
		}
		if (member.roles.cache.has(role.id)) {
			member.roles.remove(role.id).then((ok) => {
				message.sendTranslated(
					"utilities:role.removed",
					[{
						role: role.name,
						user: `${member.user.username}#${member.user.discriminator}`
					}]
				);
			});
		} else {
			member.roles.add(role.id).then((ok) => {
				message.sendTranslated(
					"utilities:role.added",
					[{
						role: role.name,
						user: `${member.user.username}#${member.user.discriminator}`
					}]
				);
			});
		}
	}
}
