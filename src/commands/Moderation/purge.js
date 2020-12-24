const SyrusCommand = require("../../lib/structures/SyrusCommand");
const { Permissions } = require("discord.js");

module.exports = class ClientCommand extends SyrusCommand {
	constructor(context) {
		super(context, {
			name: "purge",
			aliases: ["cleanup", "prune"],
			description: "moderation:purge.description",
			preconditions: ["GuildOnly", {entry: "Permissions", context: {
				permissions: new Permissions(Permissions.FLAGS.MANAGE_MESSAGES)
			}}]
		});
	}

	async run(message, args) {
		const amount = await args.pickResult("integer");
		if (amount.value === undefined) {
			amount.value = 1;
		}
		await message.delete();
		const messages = await message.channel.messages
			.fetch({limit: amount.value});
		await message.channel.bulkDelete(messages);
		const finishedMessage = await message.sendTranslated(
			"moderation:purge.purged",
			[{amount: amount.value}]
		);

		setTimeout(() => {
			finishedMessage.delete();
		}, 3000);
	}
};
