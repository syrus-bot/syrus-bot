const config = require('../config.json');
const { err, ok, Precondition, UserError } = require('@sapphire/framework');

module.exports = class ClientPrecondition extends Precondition {
	run(message) {
		return message.author.id === message.guild.ownerID ? ok() : err(new UserError('serverOwnerOnly', 'Only my masters are allowed to execute this command.'));
	}
}