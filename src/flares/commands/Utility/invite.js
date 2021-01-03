const SyrusCommand = require("@struct/SyrusCommand");
const { PermissionsPrecondition } = require("@sapphire/framework");
const { Permissions } = require("discord.js");

module.exports = class ClientCommand extends SyrusCommand {
	constructor(context) {
		super(context, {
			name: "invite",
			aliases: ["ci", "crinv"],
			description: "utilities:invite.description",
			preconditions: [
				"GuildOnly",
				new PermissionsPrecondition(
					Permissions.FLAGS.CREATE_INSTANT_INVITE
				)
			]
		});
	}

	async run(message) {
		message.channel.createInvite(
			{ maxAge: 0, maxUses: 0 },
			`Created by ${message.author.toString()}`
		).then((invite) => {
			message.replyTranslated(
				"utilities:invite.created",
				[{inv: invite.toString()}]
			);
		});
	}
};
