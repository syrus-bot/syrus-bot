const SyrusCommand = require("@struct/SyrusCommand");

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
			return message.replyTranslated("music:channelreq");
		}

		const songs = await args.restResult("string");
		if (!songs.success) {
			return message.replyTranslated(
				"global:commerr.missingparams",
				[{arg: "song"}]
			);
		}

		const queue = this.context.client.music.queues.get(message.guild.id);
		const myVoice = message.guild.me.voice;
		if (!myVoice.channel) {
			await queue.player.join(theirVoice.id);
		}
		const tracks = await this.context.client.music.fetchTracks(songs.value);
		switch (tracks.loadType) {
			case "SEARCH_RESULT":
				await queue.add(tracks.tracks[0].track);
				break;
			case "TRACK_LOADED":
				await queue.add(tracks.tracks[0].track);
				break;
			case "PLAYLIST_LOADED":
				await queue.add(tracks.tracks.map((track) => track.track));
				break;
			default:
				// noop
		}

		queue.player.infoChannel = queue.player.infoChannel ?? message.channel;

		if (!queue.player.playing) {
			await queue.start();
		}
	}
};
