const { Precondition } = require("@sapphire/framework");

module.exports = class ClientPrecondition extends Precondition {
	async run(message) {
		let isOwner;
		isOwner = message.author.id === message.guild.ownerID;
		if (!isOwner) {
			isOwner = await this.context.client.preconditions.find(
				(precondition) => precondition.name === "Owner"
			).run(message);
			isOwner = isOwner.success;
		}
		return isOwner ? this.ok() : this.error(
			this.name
		);
	}
};
