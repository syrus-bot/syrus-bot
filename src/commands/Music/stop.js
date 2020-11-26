const SyrusCommand = require("../../lib/structures/SyrusCommand");
const { Args, CommandOptions } = require("@sapphire/framework");

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
		return message.sendTranslated("music:stop.nothing");
	}
};
