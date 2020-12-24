const { Event } = require("@sapphire/framework");

module.exports = class readyEvent extends Event {
	constructor(context) {
		super(context, {
			once: true,
			event: "ready"
		});
	}

	async run() {
		const guilds = this.client.guilds.cache.size;
		console.log(
			`Successfully initialised and connected to ${guilds} servers.`
		);
		this.client.user.setPresence({
			activity: {
				name: `over ${guilds} servers! | syrus.gg`,
				type: "WATCHING"
			},
			status: "dnd"
		});
	}
};
