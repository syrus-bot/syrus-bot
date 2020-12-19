const { Precondition } = require("@sapphire/framework");

module.exports = class ClientPrecondition extends Precondition {
	checkRoles(roles, against) {
		return roles.some((role) => against.includes(role.id));
	}

	async run(message) {
		const config = await this.client.settings.guild(message.guild.id);
		let isMod;
		isMod = this.checkRoles(
			message.member.roles.cache,
			config.modRoles
		);
		if (!isMod) {
			isMod = await this.client.preconditions.find((precondition) => {
				return precondition.name === "Admin";
			}).run(message);
			isMod = isMod.success;
		}
		return isMod ? this.ok() : this.error(
			this.name,
			"Only moderators or higher are allowed to execute that command."
		);
	}
};
