const SyrusCommand = require("@struct/SyrusCommand");
const { PermissionsPrecondition } = require("@sapphire/framework");
const { Permissions } = require("discord.js");

module.exports = class ClientCommand extends SyrusCommand {
	constructor(context) {
		super(context, {
			name: "purge",
			aliases: ["cleanup", "prune"],
			description: "moderation:purge.description",
			preconditions: [
				"GuildOnly",
				new PermissionsPrecondition(Permissions.FLAGS.MANAGE_MESSAGES)
			]
		});
	}

	async run(message, args) {
		const amount = await args.pickResult("integer");
		if (amount.value === undefined) {
			amount.value = 1;
		}
		if (amount.value > 100 || amount.value < 1) {
			return message.replyTranslated("moderation:purge.invalidamt");
		}
		await message.delete();
		const messages = await message.channel.messages
			.fetch({limit: amount.value});
		await message.channel.bulkDelete(messages, {filterOld: true}).then(async messages => {
			const finishedMessage = await message.replyTranslated(
				"moderation:purge.purged",
				[{amount: messages.size}]
			);
	
			setTimeout(() => {
				finishedMessage.delete();
			}, 3000);
		});
	}
};
