const SyrusCommand = require("@struct/SyrusCommand");
const { PermissionsPrecondition } = require("@sapphire/framework");
const { Permissions } = require("discord.js");

module.exports = class ClientCommand extends SyrusCommand {
	constructor(context) {
		super(context, {
			name: "topic",
			description: "utilities:topic.description",
			preconditions: [
				"GuildOnly",
				new PermissionsPrecondition(Permissions.FLAGS.MANAGE_CHANNELS)
			]
		});
	}


	async run(message, args) {
		const topic = await args.restResult("string");
		let newtopic;
		if (topic.success) {
			newtopic = topic.value;
		} else {
			newtopic = "";
		}

		if (!message.channel.manageable) {
			return message.replyTranslated("global:missingperms");
		}

		message.channel
			.setTopic(newtopic)
			.then(() => {
				message.replyTranslated(
					"utilities:topic.changed",
					[{
						channel: message.channel.name,
						topic: newtopic || "[]"
					}]
				);
			});
	}
};
