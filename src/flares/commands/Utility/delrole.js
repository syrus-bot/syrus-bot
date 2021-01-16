const SyrusCommand = require("@struct/SyrusCommand");
const { PermissionsPrecondition } = require("@sapphire/framework");
const { Permissions } = require("discord.js");

module.exports = class ClientCommand extends SyrusCommand {
	constructor(context) {
		super(context, {
			name: "delrole",
			description: "utilities:delrole.description",
			preconditions: [
				"GuildOnly",
				new PermissionsPrecondition(Permissions.FLAGS.MANAGE_ROLES)
			]
		});
	}

	async run(message, args) {
		const role = await args.pickResult("role");
		if (!role.success) {
			return message.replyTranslated("global:notfound", [{
				type: "role"
			}]);
		}

		const memberPosition = message.member.roles.highest.position;
		const rolePosition = role.value.position;
		if (!role.value.editable || memberPosition <= rolePosition) {
			return message.replyTranslated(
				"global:highererr",
				[{
					func: "delete",
					type: "role"
				}]
			);
		}

		role.value
			.delete()
			.then((done) => {
				message.replyTranslated(
					"utilities:delrole.deleted",
					[{deleted: role.value.name}]
				);
			});
	}
};
