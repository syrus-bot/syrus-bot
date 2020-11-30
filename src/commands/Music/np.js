const SyrusCommand = require("../../lib/structures/SyrusCommand");
const { Timestamp } = require("@sapphire/time-utilities");
const { MessageEmbed } = require("discord.js");

module.exports = class ClientCommand extends SyrusCommand {
	constructor(context) {
		super(context, {
			name: "np",
			aliases: ["nowplaying", "song", "track"],
			description: "music:np.description"
		});
	}

	async run(message, args) {
		const queue = this.client.music.queues.get(message.guild.id);
		if (!queue.player.playing) {
			return message.sendTranslated("music:np.nothing");
		}
		const currentObject = await queue.current();
		const identifier = currentObject.track;
		const resolved = await this.client.music.decode(identifier);
		const formatter = new Timestamp("HH:mm:ss");
		const position = formatter.displayUTC(currentObject.position);
		const live = resolved.isStream;
		const duration = live ? "LIVE" : formatter.displayUTC(resolved.length);

		const embed = new MessageEmbed()
			.setTitle(await message.fetchLanguageKey("music:playing"))
			.setDescription(
				`**[${resolved.author} | ${resolved.title}](${resolved.uri})**`
			)
			.addField(
				await message.fetchLanguageKey("music:np.time"),
				`${position} / ${duration}`,
				true
			)

		/*
			TODO: Add information about who requested the song,
			and the thumbnail
		*/
		return message.channel.send(embed)
	}
};
