const { Event } = require("@sapphire/framework");

module.exports = class errorEvent extends Event {
	constructor(context) {
		super(context, {
			once: false,
			event: "commandError"
		});
	}

	async run(error, errorPayload) {
		console.log(`Error in command ${errorPayload.piece.name}: ${error}`);
		errorPayload.message.channel.send(`Whoops! Look like there was an error in the command you just ran. Sorry about that!\nPlease can you report this to the Syrus development team in our support server? Here's some debug information to give them:\n\`${errorPayload.piece.name} - ${errorPayload.message.createdTimestamp} - ${error}\``);
	}
};
