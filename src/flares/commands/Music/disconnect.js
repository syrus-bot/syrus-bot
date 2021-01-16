const SyrusCommand = require("@struct/SyrusCommand");

module.exports = class ClientCommand extends SyrusCommand {
	constructor(context) {
		super(context, {
			name: "disconnect",
			description: "music:disconnect.description"
		});
	}

	async run(message, args) {
		const theirVoice = message.member.voice;
		const myVoice = message.guild.me.voice;
		if (theirVoice.channelID !== myVoice.channelID) {
			return message.replyTranslated(
				"music:reqsamechannel"
			);
		}

		const queue = this.context.client.music.queues.get(message.guild.id);
		await queue.clear();
		await queue.player.leave();
		await queue.player.destroy();
		return message.replyTranslated(
			"music:disconnect.disconnected",
			[{channel: myVoice.channel.name}]
		);
	}
};
