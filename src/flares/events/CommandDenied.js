const { Event } = require("@sapphire/framework");

module.exports = class PreconditionErrorEvent extends Event {
	constructor(context) {
		super(context, {
			event: "commandDenied"
		});
	}

	async run(error, context) {
		console.log(error);
		console.log(context);
	}
};
