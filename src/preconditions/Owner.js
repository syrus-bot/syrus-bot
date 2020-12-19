const config = require("../config.json");
const { err, ok, Precondition, UserError } = require("@sapphire/framework");

module.exports = class ClientPrecondition extends Precondition {
	run(message) {
		const isOwner = config.owners.includes(message.author.id);
		return isOwner ? ok() : err(new UserError(
			"ownerOnly",
			"Only my masters are allowed to execute this command."
		));
	}
};
