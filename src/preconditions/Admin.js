const { Precondition } = require("@sapphire/framework");

module.exports = class ClientPrecondition extends Precondition {
	checkRoles(roles, against) {
		return roles.some((role) => against.includes(role.id));
	}

	async run(message) {
		// TODO: add cascade for serverowner
		const config = await this.client.settings.guild(message.guild.id);
		const isAdmin = this.checkRoles(
			message.member.roles.cache,
			config.adminRoles
		);
		return isAdmin ? this.ok() : this.error(
			this.name,
			"Only administrators or higher are allowed to execute that command."
		);
	}
};
