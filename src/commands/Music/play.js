const SyrusCommand = require("../../lib/structures/SyrusCommand");
const { Args, CommandOptions } = require("@sapphire/framework");

module.exports = class ClientCommand extends SyrusCommand {

	constructor(context) {
		super(context, {
			name: "play",
			description: "music:play.description"
		});
	}

	async run(message, args) {
		const theirVoice = message.member.voice.channel;
		if (!theirVoice || !theirVoice?.joinable) {
			return message.sendTranslated("music:channelreq");
		}

		const songs = await args.restResult("string");
		if (!songs.success) {
			return message.sendTranslated(
				"global:commerr.missingparams",
				[{arg: "song"}]
			)
		}

		const queue = this.client.music.queues.get(message.guild.id);
		const myVoice = message.guild.me.voice;
		if (!myVoice.channel) {
			await queue.player.join(theirVoice.id);
		}
		const tracks = await this.client.music.fetchTracks(songs.value);
		switch (tracks.loadType) {
			// TODO: implement handler for search
			case "TRACK_LOADED":
				await queue.add(tracks.tracks.map((track) => track.track));
				break;
			case "PLAYLIST_LOADED":
				await queue.add(tracks.tracks.map((track) => track.track));
				break;
			default:
				// noop
		}
		// TODO: implement embed for playing
		if (!queue.player.playing) {
			await queue.start();
		}
	}
};
