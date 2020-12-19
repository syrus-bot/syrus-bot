const config = require("../config.json");
const { Precondition } = require("@sapphire/framework");

module.exports = class ClientPrecondition extends Precondition {
	run(message) {
		const isOwner = config.owners.includes(message.author.id);
		return isOwner ? this.ok() : this.err(
			this.name,
			"Only my masters are allowed to execute this command."
		);
	}
};
