const { Event } = require("@sapphire/framework");
const MusicManager = require("../lib/structures/MusicManager");

module.exports = class readyEvent extends Event {
	constructor(context) {
		super(context, {
			once: true,
			event: "ready"
		});
	}

	async run() {
		console.log(`Successfully initialised and connected to ${this.client.guilds.cache.size} servers.`);
		this.client.user.setPresence({activity: {name: `over ${this.client.guilds.cache.size} servers! | syrus.gg`, type: "WATCHING"}, status: "dnd"});
		this.client.music = new MusicManager(this.client);
	}
};
