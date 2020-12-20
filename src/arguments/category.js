const { Argument } = require("@sapphire/framework");

module.exports = class ClientArgument extends Argument {
	constructor(context) {
		super(context, {name: "category"});
	}

	async parseCategory(argument) {
		const category = this.client.commands.fetchCategory(argument);
		return category ? category : undefined;
	}

	async run(argument, context) {
		const category = await this.parseCategory(argument);

		return category ? this.ok(category) : this.error(
			argument,
			"ArgumentCategoryUnknownCategory",
			"The argument did not resolve to a category."
		);
	}
};
