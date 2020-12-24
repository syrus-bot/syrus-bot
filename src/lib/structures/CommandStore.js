const { BaseAliasStore } = require("@sapphire/framework");
const SyrusCommand = require("./SyrusCommand");

module.exports = class SyrusCommandStore extends BaseAliasStore {
	constructor(client) {
		super(client, SyrusCommand, {name: "commands"});
	}

	fetchCategory(categoryName) {
		if (!this.categories.includes(categoryName)) {
			return undefined;
		}
		const filter = this
			.filter((command) => command.category === categoryName);
		filter.name = categoryName;
		return filter;
	}

	categorized() {
		return Array.from(
			this.categories,
			(category) => this.fetchCategory(category)
		);
	}

	get categories() {
		return Array.from(new Set(this.map((command) => command.category)));
	}
};
