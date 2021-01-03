const { Event } = require("@sapphire/framework");

module.exports = class readyEvent extends Event {
	constructor(context) {
		super(context, {
			once: true,
			event: "ready"
		});
	}

	async run() {
		const client = this.context.client;
		const guilds = client.guilds.cache.size;
		client.logger.info(
			`Successfully initialised and connected to ${guilds} servers.`
		);
		await client.user.setPresence({
			activity: {
				name: `over ${guilds} servers! | syrus.gg`,
				type: "WATCHING"
			},
			status: "dnd"
		});
	}
};
