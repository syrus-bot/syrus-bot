const { Precondition } = require("@sapphire/framework");
const { Permissions } = require("discord.js");

module.exports = class ClientPrecondition extends Precondition {
	constructor(...args) {
		super(...args);
		this.dm = new Permissions([
			Permissions.FLAGS.VIEW_CHANNEL,
			Permissions.FLAGS.SEND_MESSAGES,
			Permissions.FLAGS.SEND_TTS_MESSAGES,
			Permissions.FLAGS.EMBED_LINKS,
			Permissions.FLAGS.ATTACH_FILES,
			Permissions.FLAGS.READ_MESSAGE_HISTORY,
			Permissions.FLAGS.MENTION_EVERYONE,
			Permissions.FLAGS.USE_EXTERNAL_EMOJIS,
			Permissions.FLAGS.ADD_REACTIONS
		]);
	}

	run(message, command, context) {
		const required = context.permissions;
		const clientPermissions = message.channel.permissionsFor(
			this.client.id
		);
		const authorPermissions = message.channel.permissionsFor(
			message.author.id
		);

		const myPermissions = message.guild ? clientPermissions : this.dm;
		const theirPermissions = message.guild ? authorPermissions : this.dm;
		const imMissing = myPermissions.missing(required);
		const wereMissing = theirPermissions.missing(required);

		const missingAny = imMissing.length === 0 && wereMissing.length === 0;
		return missingAny ? this.ok() : this.error(
			this.name,
			"The bot or user is missing permissions to run this command."
		);
	}
};
