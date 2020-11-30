const { Precondition } = require("@sapphire/framework");

module.exports = class ClientPrecondition extends Precondition {
	run(message) {
		const isOwner = message.author.id === message.guild.ownerID;
		return isOwner ? this.ok() : this.err(
			this.name,
			"Only my masters are allowed to execute this command."
		);
	}
}
