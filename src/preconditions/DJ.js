const { Precondition } = require("@sapphire/framework");

module.exports = class ClientPrecondition extends Precondition {
	checkRoles(roles, against) {
		return roles.some((role) => against.includes(role.id));
	}

	async run(message) {
		// TODO: add cascade for moderator
		const config = await this.client.settings.guild(message.guild.id);
		const isDj = this.checkRoles(
			message.member.roles.cache,
			config.djRoles
		);
		return isDj ? this.ok() : this.error(
			this.name,
			"Only DJs or higher are allowed to execute that command."
		);
	}
};
