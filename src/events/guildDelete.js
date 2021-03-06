const { Event } = require("@sapphire/framework");

module.exports = class cleanupEvent extends Event {
	constructor(context) {
		super(context, {
			once: false,
			event: "guildDelete"
		});
	}

	async run(guild) {
		await this.client.settings.guildDelete(guild.id);
	}
};
