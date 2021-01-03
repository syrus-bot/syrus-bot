const SyrusCommand = require("@struct/SyrusCommand");
const { PermissionsPrecondition } = require("@sapphire/framework");
const { Permissions } = require("discord.js");

module.exports = class ClientCommand extends SyrusCommand {
	constructor(context) {
		super(context, {
			name: "unlock",
			description: "moderation:lockdown.description",
			preconditions: [
				"GuildOnly",
				new PermissionsPrecondition(Permissions.FLAGS.MANAGE_CHANNELS)
			]
		});
	}

	async run(message) {
		message.channel.updateOverwrite(
			message.guild.roles.everyone,
			{SEND_MESSAGES: false}
		);
		message.replyTranslated(
			"moderation:unlock.unlocked",
			[{channel: `<#${message.channel.id}>`}]
		);
	}
};
