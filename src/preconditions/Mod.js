const { Precondition } = require("@sapphire/framework");

module.exports = class ClientPrecondition extends Precondition {
	checkRoles(roles, against) {
		return roles.some((role) => against.includes(role.id));
	}

	async run(message) {
		// TODO: add cascade for admin
		const config = await this.client.settings.guild(message.guild.id);
		const isMod = this.checkRoles(
			message.member.roles.cache,
			config.modRoles
		);
		return isMod ? this.ok() : this.error(
			this.name,
			"Only moderators or higher are allowed to execute that command."
		);
	}
}
