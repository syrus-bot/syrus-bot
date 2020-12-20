const { Argument } = require("@sapphire/framework");
const globby = require("globby");

module.exports = class ClientArgument extends Argument {
	constructor(context) {
		super(context, {name: "command"});
	}

	async parseLoaded(argument) {
		const command = this.client.commands.get(argument);
		return command ?? undefined;
	}

	async getCommand(path) {
		delete require.cache[require.resolve(path)];
		const loaded = await this.client.commands.load(path);
		return loaded.next();
	}

	async parseFiles(argument) {
		if (this.client.commands.has(argument)) {
			return undefined;
		}
		const files = await globby(
			`commands/**/${argument}.js`,
			{absolute: true}
		);
		const path = files[0];
		const command = path ? await this.getCommand(path) : undefined;
		return command ? command.value : undefined;
	}

	async run(argument, context) {
		const command = await this.parseLoaded(argument)
			?? await this.parseFiles(argument);

		return command ? this.ok(command) : this.error(
			argument,
			"ArgumentCommandUnknownCommand",
			"The argument did not resolve to a command."
		);
	}
};
