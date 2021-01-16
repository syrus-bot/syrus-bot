const { Event } = require("@sapphire/framework");

module.exports = class ClientError extends Event {
	constructor(context) {
		super(context, {
			event: "commandError"
		});
	}

	async run(error, errorPayload) {
		const logger = this.context.client.logger;
		logger.err(`Error in command ${errorPayload.piece.name}:`);
		logger.trace(error);
		errorPayload.message.replyTranslated(
			"global:commerr.runtime",
			[{err: `\`${errorPayload.piece.name} - ${errorPayload.message.createdTimestamp} - ${error}\``}]
		);
	}
};
