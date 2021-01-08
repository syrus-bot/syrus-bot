const { Event } = require("@sapphire/framework");

module.exports = class EventError extends Event {
	constructor(context) {
		super(context, {
			event: "eventError"
		});
	}

	async run(error, errorPayload) {
		const logger = this.context.client.logger;
		logger.err(`Error in Event ${errorPayload.piece.name}:`);
		logger.trace(error);
	}
};
