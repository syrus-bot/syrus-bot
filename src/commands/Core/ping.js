const SyrusCommand = require("../../lib/structures/SyrusCommand");
const { Args, CommandOptions } = require("@sapphire/framework");

module.exports = class ClientCommand extends SyrusCommand {
	constructor(context) {
		super(context, {
			name: "ping",
			description: "core:ping.description"
		});
	}

	async run(message, args) {
		const time = Date.now();
		const msg = await message.sendTranslated("core:ping.ping");
		const complete = Date.now();
		const key = await message.fetchLanguageKey(
			"core:ping.pong",
			{
				execution: time - message.createdTimestamp,
				roundtrip: complete - time,
				heartbeat: Math.round(this.client.ws.ping)
			}
		);
		await msg.edit(key);
	}
};
