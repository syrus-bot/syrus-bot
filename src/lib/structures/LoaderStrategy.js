const { LoaderStrategy } = require("@sapphire/pieces");

module.exports = class SyrusLoaderStrategy extends LoaderStrategy {
	onLoad(store, command) {
		if (!store.categories.includes(command.category)) {
			store.categories.push(command.category);
		}
	}

	onUnload(store, command) {
		if (Array.from(store.fetchCategory(command.category)).length === 0) {
			store.categories = store.categories.filter(
				(category) => category !== command.category
			);
		}
	}
};
