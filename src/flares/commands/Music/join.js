const SyrusCommand = require("@struct/SyrusCommand");

module.exports = class ClientCommand extends SyrusCommand {
	constructor(context) {
		super(context, {
			name: "join",
			aliases: ["connect", "summon"],
			description: "music:join.description"
		});
	}

	async run(message, args) {
		const theirVoice = message.member.voice;
		if (theirVoice.channelID !== null) {
			const queue = this.client.music.queues.get(message.guild.id);
			await queue.player.join(theirVoice.channelID);
			return message.replyTranslated(
				"music:join.joined",
				[{channel: theirVoice.channel.name}]
			);
		}
		await message.replyTranslated("music:channelreq");
	}
};
