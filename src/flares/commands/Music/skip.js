const SyrusCommand = require("@struct/SyrusCommand");

module.exports = class ClientCommand extends SyrusCommand {
	constructor(context) {
		super(context, {
			name: "skip",
			description: "music:skip.description"
		});
	}

	async run(message, args) {
		const queue = this.context.client.music.queues.get(message.guild.id);
		const tracks = await queue.tracks();
		if (queue.player.playing && tracks.length) {
			await queue.next();
			return message.replyTranslated("music:skip.skipped");
		}
		return message.replyTranslated("music:skip.nothing");
	}
};
