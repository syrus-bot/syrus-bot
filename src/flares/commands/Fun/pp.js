const SyrusCommand = require("@struct/SyrusCommand");
const { MessageEmbed } = require("discord.js");

module.exports = class ClientCommand extends SyrusCommand {
	constructor(context) {
		super(context, {
			name: "pp",
			description: "fun:pp.description"
		});
	}

	async run(message, args) {
		const shaft = "=".repeat(Math.floor(Math.random() * 24));
		const member = await args.pickResult("member");
		let disp;
		if (member.success) {
			disp = member.value.displayName;
		} else {
			disp = message.author.username;
		}
		message.channel.send(
			new MessageEmbed()
				.setColor("#34eb7d")
				.setTitle(`${disp}'s PP size`)
				.setDescription(`**8${shaft}D**`)
		);
	}
};
