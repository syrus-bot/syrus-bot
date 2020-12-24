const SyrusCommand = require("../../lib/structures/SyrusCommand");

module.exports = class ClientCommand extends SyrusCommand {
	constructor(context) {
		super(context, {
			name: "reload",
			description: "core:reload.description",
			preconditions: ["Owner"]
		});
	}

	async run(message, args) {
		const command = await args.pickResult("command");
		if (!command.success) {
			if (command.error.parameter === "all") {
				this.client.commands.forEach((value, key, map) => {
					delete require.cache[require.resolve(value.path)];
				});
				this.client.commands.clear();
				await this.client.commands.loadAll();
				message.sendTranslated("core:reload.allreloaded");
				return;
			}
			return message.sendTranslated(
				"core:reload.notfound",
				[{commandName: command.error.parameter}]
			);
		}

		this.client.commands.delete(command.value.name);
		const reloaded = await args.start().pickResult("command");
		await this.client.commands.insert(reloaded.value);
		message.sendTranslated(
			"core:reload.reloaded",
			[{commandName: command.value.name}]
		);
	}
};
