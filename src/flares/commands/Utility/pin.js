const SyrusCommand = require("@struct/SyrusCommand");
const { PermissionsPrecondition } = require("@sapphire/framework");
const { Permissions } = require("discord.js");

module.exports = class ClientCommand extends SyrusCommand {
	constructor(context) {
		super(context, {
			name: "pin",
			description: "utilities:pin.description",
			preconditions: [
				"GuildOnly",
				new PermissionsPrecondition(Permissions.FLAGS.MANAGE_MESSAGES)
			]
		});
	}

	async run(message) {
		message.channel.messages
			.fetch({ limit: 2 })
			.then((messages) => {
				const lastMessage = messages.last();
				lastMessage.pin();
			});
	}
};
