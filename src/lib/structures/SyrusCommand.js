const { Command } = require("@sapphire/framework");
const path = require("path");

module.exports = class SyrusCommand extends Command {
	constructor(context, {name, ...options}) {
		super(
			context,
			{
				...options,
				name: (name ?? context.name).toLowerCase()
			}
		);
		const folder = path.dirname(
			this.path.replace(/\\/g, "/")
		).split("/");
		this.category = folder[folder.length - 1];
		this.usage = options.usage ?? `${this.name} [...args]`;
		this.client = this.store.client;
	}
};
