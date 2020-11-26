const SyrusCommand = require("../../lib/structures/SyrusCommand");
const { Args, CommandOptions } = require("@sapphire/framework");
const { Permissions } = require("discord.js");

module.exports = class ClientCommand extends SyrusCommand {
	constructor(context) {
		super(context, {
			name: "topic",
			description: "utilities:topic.description",
			preconditions: ["GuildOnly", {entry: "permissions", context: {
				permissions: new Permissions(Permissions.FLAGS.MANAGE_CHANNELS)
			}}]
		});
	}


	async run(message, args) {
		const topic = await args.restResult("string");
		let newtopic;
		if (topic.success) {
			newtopic = topic.value;
		} else {
			newtopic = ""
		}

		if (!message.channel.manageable) {
			return message.sendTranslated("global:missingperms");
		}

		message.channel
			.setTopic(newtopic)
			.then(() => {
				message.sendTranslated(
					"utilities:topic.changed",
					[{
						channel: message.channel.name,
						topic: newtopic || "[]"
					}]
				);
			});
	}
}
