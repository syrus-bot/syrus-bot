const { Precondition } = require("@sapphire/framework");

module.exports = class ClientPrecondition extends Precondition {
	checkRoles(roles, against) {
		return roles.some((role) => against.includes(role.id));
	}

	async run(message, conf) {
		const config = conf ?? await this.client.settings.guild(
			message.guild.id
		);
		let isAdmin;
		isAdmin = this.checkRoles(
			message.member.roles.cache,
			config.adminRoles
		);
		if (!isAdmin) {
			isAdmin = await this.client.preconditions.find((precondition) => {
				return precondition.name === "ServerOwner";
			}).run(message);
			isAdmin = isAdmin.success;
		}
		return isAdmin ? this.ok() : this.error(
			this.name,
			"Only administrators or higher are allowed to execute that command."
		);
	}
};
