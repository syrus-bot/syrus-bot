const SyrusCommand = require("../../lib/structures/SyrusCommand");

module.exports = class ClientCommand extends SyrusCommand {
	constructor(context) {
		super(context, {
			name: "skip",
			description: "music:skip.description"
		});
	}

	async run(message, args) {
		const queue = this.client.music.queues.get(message.guild.id);
		const tracks = await queue.tracks();
		if (queue.player.playing && tracks.length) {
			await queue.next();
			return message.sendTranslated("music:skip.skipped");
		}
		return message.sendTranslated("music:skip.nothing");
	}
};
