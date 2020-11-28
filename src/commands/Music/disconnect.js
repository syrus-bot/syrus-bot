const SyrusCommand = require("../../lib/structures/SyrusCommand");
const { Args, CommandOptions } = require("@sapphire/framework");

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
			return message.sendTranslated(
				"music:reqsamechannel",
				[{channel: theirVoice.channel.name}]
			)
		}

		const queue = this.client.music.queues.get(message.guild.id);
		await queue.clear();
		await queue.player.leave();
		await queue.player.destroy();
		return message.sendTranslated(
			"music:disconnect.disconnected",
			[{channel: theirVoice.channel.name}]
		);
	}
};
