const SyrusCommand = require("../../lib/structures/SyrusCommand");
const { Args, CommandOptions } = require("@sapphire/framework");
const { Permissions } = require("discord.js");

module.exports = class ClientCommand extends SyrusCommand {
	constructor(context) {
		super(context, {
			name: "unlock",
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
			"moderation:unlock.unlocked",
			[{channel: `<#${message.channel.id}>`}]
		);
	}
}
