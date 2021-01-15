const { Event } = require("@sapphire/framework");

module.exports = class ClientEvent extends Event {
	constructor(context) {
		super(context, {
			event: "voiceStateUpdate"
		});
	}

	async run(oldState, newState) {
		const queue = this.context.client.music.queues.get(newState.guild.id);
		if (queue.player.voiceState === undefined) {
			return;
		}
		const usersInVoice = Array.from(
			newState.guild.me.voice.channel.members.filter(
				(member) => !member.user.bot
			)
		);
		if (usersInVoice.length === 0) {
			if (queue.player.infoChannel) {
				await queue.player.infoChannel.sendTranslated(
					"music:disconnect.autodisconnected",
					{channel: newState.guild.me.voice.channel.name}
				);
			}
			await queue.clear();
			await queue.player.leave();
			await queue.player.destroy();
		}
	}
};
