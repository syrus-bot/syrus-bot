const SyrusCommand = require("../../lib/structures/SyrusCommand");

module.exports = class ClientCommand extends SyrusCommand {

	constructor(context) {
		super(context, {
			name: "stop",
			aliases: ["clearq", "clearqueue"],
			description: "music:stop.description"
		});
	}

	async run(message, args) {
		const queue = this.client.music.queues.get(message.guild.id);
		if (queue.player.playing) {
			await queue.stop();
			await queue.clear();
			return message.sendTranslated("music:stop.stopped");
		}
		queue.player.infoChannel = undefined;
		return message.sendTranslated("music:stop.nothing");
	}
};
