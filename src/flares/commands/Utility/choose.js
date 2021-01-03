const SyrusCommand = require("@struct/SyrusCommand");

module.exports = class ClientCommand extends SyrusCommand {
	constructor(context) {
		super(context, {
			name: "choose",
			aliases: ["pick"],
			description: "utilities:choose.description"
		});
	}

	async run(message, args) {
		const choices = await args.restResult("string");
		if (choices.value === undefined) {
			return message.replyTranslated("global:missingparameters");
		}
		const options = choices.value.split(", ");
		if (options.length <= 1) {
			return message.replyTranslated("utilities:choose.comma");
		}
		message.channel.send(`Hmm... I choose... ${options[Math.floor(Math.random() * options.length)]}!`);
	}
};
