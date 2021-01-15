const { Precondition } = require("@sapphire/framework");

module.exports = class ClientPrecondition extends Precondition {
	checkRoles(roles, against) {
		return roles.some((role) => against.includes(role.id));
	}

	async run(message, conf) {
		const config = conf ?? await this.context.client.settings.guild(
			message.guild.id
		);
		let isDj;
		isDj = this.checkRoles(
			message.member.roles.cache,
			config.djRoles
		);
		if (!isDj) {
			isDj = await this.context.client.preconditions.find(
				(precondition) => precondition.name === "Mod"
			).run(message, config);
			isDj = isDj.success;
		}
		return isDj ? this.ok() : this.error(
			this.name
		);
	}
};
