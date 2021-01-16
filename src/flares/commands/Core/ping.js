const SyrusCommand = require("@struct/SyrusCommand");

module.exports = class ClientCommand extends SyrusCommand {
	constructor(context) {
		super(context, {
			name: "ping",
			description: "core:ping.description"
		});
	}

	async run(message, args) {
		const time = Date.now();
		const msg = await message.replyTranslated("core:ping.ping");
		const complete = Date.now();
		await msg.editTranslated(
			"core:ping.pong",
			[{
				execution: time - message.createdTimestamp,
				roundtrip: complete - time,
				heartbeat: Math.round(this.context.client.ws.ping)
			}]
		);
	}
};
