const { Precondition } = require("@sapphire/framework");

module.exports = class ClientPrecondition extends Precondition {
	async run(message) {
		let isOwner;
		isOwner = message.author.id === message.guild.ownerID;
		if (!isOwner) {
			isOwner = await this.client.preconditions.find((precondition) => {
				return precondition.name === "Owner";
			}).run(message);
			isOwner = isOwner.success;
		}
		return isOwner ? this.ok() : this.err(
			this.name,
			"Only my masters are allowed to execute this command."
		);
	}
};
