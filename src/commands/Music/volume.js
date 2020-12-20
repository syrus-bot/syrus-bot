const SyrusCommand = require("../../lib/structures/SyrusCommand");

module.exports = class ClientCommand extends SyrusCommand {
	constructor(context) {
		super(context, {
			name: "volume",
			aliases: ["vol"],
			description: "music:volume.description"
		});
	}

	async run(message, args) {
		const volume = await args.pickResult("number");
		if (!volume.success) {
			return message.sendTranslated("music:volume.missing");
		}
		const player = this.client.music.queues.get(message.guild.id).player;
		await player.setVolume(volume.value);
		return message.sendTranslated(
			"music:volume.set",
			[{volume: volume.value}]
		);
	}
};
