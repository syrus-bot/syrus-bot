const SyrusCommand = require("@struct/SyrusCommand");

module.exports = class ClientCommand extends SyrusCommand {
	constructor(context) {
		super(context, {
			name: "pause",
			description: "music:pause.description"
		});
	}

	async run(message, args) {
		const player = this.context.client.music.queues.get(message.guild.id)
			.player;
		if (!player.paused) {
			await player.pause();
			return message.replyTranslated("music:pause.paused");
		}
		return message.replyTranslated("music:pause.already");
	}
};
