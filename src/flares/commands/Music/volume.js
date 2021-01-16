const SyrusCommand = require("@struct/SyrusCommand");

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
			return message.replyTranslated("music:volume.missing");
		}
		await this.context.client.music.queues.get(message.guild.id).player
			.setVolume(volume.value);
		return message.replyTranslated(
			"music:volume.set",
			[{volume: volume.value}]
		);
	}
};
