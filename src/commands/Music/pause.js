const SyrusCommand = require("../../lib/structures/SyrusCommand");

module.exports = class ClientCommand extends SyrusCommand {

	constructor(context) {
		super(context, {
			name: "pause",
			description: "music:pause.description"
		});
	}

	async run(message, args) {
		const player = this.client.music.queues.get(message.guild.id).player;
		if (!player.paused) {
			await player.pause();
			return message.sendTranslated("music:pause.paused");
		}
		return message.sendTranslated("music:resume.already");
	}
};
