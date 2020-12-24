const { BaseAliasStore } = require("@sapphire/framework");
const SyrusCommand = require("./SyrusCommand");

function onPostLoad(store, command) {
	if (!store.categories.includes(command.category)) {
		store.categories.push(command.category);
	}
}

function onUnload(store, command) {
	if (Array.from(store.fetchCategory(command.category)).length === 0) {
		store.categories = store.categories.filter(
			(category) => category !== command.category
		);
	}
}

module.exports = class SyrusCommandStore extends BaseAliasStore {
	constructor(client) {
		super(client, SyrusCommand, {
			name: "commands",
			onPostLoad: onPostLoad,
			onUnload: onUnload
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
