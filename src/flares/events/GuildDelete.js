const { Event } = require("@sapphire/framework");

module.exports = class GuildDeleteEvent extends Event {
	constructor(context) {
		super(context, {
			event: "guildDelete"
		});
	}

	async run(guild) {
		await this.context.client.settings.guildDelete(guild.id);
	}
};
