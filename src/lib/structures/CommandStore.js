const { AliasStore } = require("@sapphire/pieces");
const SyrusCommand = require("@struct/SyrusCommand");
const LoaderStrategy = require("@struct/LoaderStrategy");

module.exports = class SyrusCommandStore extends AliasStore {
	constructor() {
		super(SyrusCommand, {
			name: "commands",
			strategy: new LoaderStrategy()
		});
		this.categories = [];
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
};
