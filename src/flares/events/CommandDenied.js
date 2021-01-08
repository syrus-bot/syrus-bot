const { Event, PreconditionError } = require("@sapphire/framework");
const { MessageEmbed } = require("discord.js");

module.exports = class CommandDeniedEvent extends Event {
	constructor(context) {
		super(context, {
			event: "commandDenied"
		});
	}

	async run(error, context) {
		const translated = await context.message.resolveKey(
			"global:commerr.denied",
			{
				cat: context.command.category,
				cmd: context.command.name,
				err: error.identifier
			}
		);
		return context.message.channel.send(
			new MessageEmbed()
				.setColor("#B11226")
				.setDescription(translated)
		);
	}
};
