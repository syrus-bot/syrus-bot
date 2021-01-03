const SyrusCommand = require("@struct/SyrusCommand");

module.exports = class ClientCommand extends SyrusCommand {
	constructor(context) {
		super(context, {
			name: "kill",
			description: "core:kill.description",
			preconditions: ["Owner"]
		});
	}

	async run(message, args) {
		await message.replyTranslated("core:kill.shutdown");
		this.client.destroy();
		process.exit();
	}
};
