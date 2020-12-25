const SyrusCommand = require("../../lib/structures/SyrusCommand");

function owoify(message) {
	const splitted = message
		.replace(/(?:r|l)/g, "w")
		.replace(/(?:R|L)/g, "W")
		.replace(/(n)([aeiou])/gi, "$1y$2") // eslint-disable-line prefer-named-capture-group
		.replace(/ove/g, "uv")
		.replace(/th/g, "ff")
		.replace(/@/g, "@\u200b");
	return splitted;
}

module.exports = class ClientCommand extends SyrusCommand {
	constructor(context) {
		super(context, {
			name: "owoify",
			aliases: ["owo", "owoifier"],
			description: "fun:owoify.description"
		});
	}

	async run(message, args) {
		const messageToOwoify = await args.restResult("string");
		if (!messageToOwoify.success) {
			return message.channel.send(
				await message.fetchLanguageKey("fun:owoify.no-msg-err")
			);
		}
		return message.channel.send(owoify(messageToOwoify.value));
	}
};
