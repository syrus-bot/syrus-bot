const SyrusCommand = require("../../lib/structures/SyrusCommand");
const { Args, CommandOptions } = require("@sapphire/framework");
const { Permissions } = require("discord.js");

module.exports = class ClientCommand extends SyrusCommand {
	constructor(context) {
		super(context, {
			name: "invite",
			aliases: ["ci", "crinv"],
			description: "utilities:invite.description",
			preconditions: ["GuildOnly", {entry: "permissions", context: {
				permissions: new Permissions(
					Permissions.FLAGS.CREATE_INSTANT_INVITE
				)
			}}]
		});
	}

	async run(message) {
		message.channel.createInvite(
			{ maxAge: 0, maxUses: 0 },
			`Created by ${message.author.toString()}`
		).then((invite) => {
			message.sendTranslated(
				"utilities:invite.created",
				[{inv: invite.toString()}]
			);
		});
	}
};
