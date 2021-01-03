const SyrusCommand = require("@struct/SyrusCommand");

module.exports = class ClientCommand extends SyrusCommand {
	constructor(context) {
		super(context, {
			name: "resume",
			aliases: ["unpause"],
			description: "music:resume.description"
		});
	}

	async run(message, args) {
		const player = this.client.music.queues.get(message.guild.id).player;
		if (player.paused) {
			await player.pause(false);
			return message.replyTranslated("music:resume.resumed");
		}
		return message.replyTranslated("music:resume.already");
	}
};
