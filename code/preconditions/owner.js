const config = require('../config.json');
const { err, ok, Precondition, UserError } = require('@sapphire/framework');

module.exports = class ClientPrecondition extends Precondition {
	run(message) {
		return config.owners.includes(message.author.id) !== undefined ? ok() : err(new UserError('ownerOnly', 'Only my masters are allowed to execute this command.'));
	}
}