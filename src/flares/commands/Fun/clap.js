const SyrusCommand = require("@struct/SyrusCommand");
const { DiscordAPIError } = require("discord.js");

function clapMessage(content) {
	let splitted;
	if (!/\s/.test(content.trim())) {
		splitted = content.split("");
	} else {
		splitted = content.split(" ");
	}
	return splitted.join(" 👏 ").replace(/@/g, "@\u200b");
}


module.exports = class ClientCommand extends SyrusCommand {
	constructor(context) {
		super(context, {
			name: "clap",
			description: "fun:clap.description"
		});
	}

	async run(message, args) {
		const messageToClap = await args.restResult("string");
		if (!messageToClap.success) {
			return message.channel.send(
				await message.resolveKey("fun:clap.no-msg-err")
			);
		}
		try {
			return message.channel.send(clapMessage(messageToClap.value));
		} catch (error) {
			if (error instanceof DiscordAPIError) {
				return message.replyTranslated("global:toolong");
			}
		}
	}
};
