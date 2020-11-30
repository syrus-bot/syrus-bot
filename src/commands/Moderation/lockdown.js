const SyrusCommand = require("../../lib/structures/SyrusCommand");
const { Permissions } = require("discord.js");

module.exports = class ClientCommand extends SyrusCommand {
	constructor(context) {
		super(context, {
			name: "lockdown",
			description: "moderation:lockdown.description",
			preconditions: ["GuildOnly", {entry: "permissions", context: {
				permissions: new Permissions(Permissions.FLAGS.MANAGE_CHANNELS)
			}}]
		});
	}

	async run(message) {
		message.channel.updateOverwrite(
			message.guild.roles.everyone,
			{SEND_MESSAGES: false}
		);
		message.sendTranslated(
			"moderation:lockdown.lockeddown",
			[{channel: `<#${message.channel.id}>`}]
		);
	}
}
