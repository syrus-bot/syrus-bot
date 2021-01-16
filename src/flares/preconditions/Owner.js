const config = require("@sky/config.json");
const { Precondition } = require("@sapphire/framework");

module.exports = class ClientPrecondition extends Precondition {
	async run(message) {
		const isOwner = config.owners.includes(message.author.id);
		return isOwner ? this.ok() : this.error(
			this.name
		);
	}
};
