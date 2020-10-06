const { Event } = require('@sapphire/framework');

module.exports = class errorEvent extends Event {
	constructor(context) {
		super(context, {
			once: false,
			event: 'commandError'
		});
	}

	async run(error, errorPayload) {
        console.log(`Error in command ${errorPayload.piece.name}: ${error}`);
		this.client.user.setPresence({activity: {name: `over ${this.client.guilds.cache.size} servers! | syrus.gg`, type: "WATCHING"}, status: "dnd"});
	}
};