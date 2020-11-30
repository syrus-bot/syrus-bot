const SyrusCommand = require("../../lib/structures/SyrusCommand");

module.exports = class ClientCommand extends SyrusCommand {
	constructor(context) {
		super(context, {
			name: "kill",
			description: "core:kill.description",
			preconditions: ["owner"]
		});
	}

	async run(message, args) {
		await message.sendTranslated("core:kill.shutdown")
		this.client.destroy()
		process.exit();
	}
}
