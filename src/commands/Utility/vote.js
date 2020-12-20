const SyrusCommand = require("../../lib/structures/SyrusCommand");
const { Permissions } = require("discord.js");

module.exports = class ClientCommand extends SyrusCommand {
	constructor(context) {
		super(context, {
			name: "vote",
			description: "utilities:vote.description",
			preconditions: ["GuildOnly", {entry: "Permissions", context: {
				permissions: new Permissions(Permissions.FLAGS.ADD_REACTIONS)
			}}]
		});
	}

	async run(message, args) {
		const vote = await args.restResult("string");
		if (!vote.success) {
			return message.sendTranslated(
				"global:commerr.missingparams",
				[{arg: "poll"}]
			);
		}
		const poll = await message.channel.send(
			`**${message.author.toString()}** asks: ${vote.value}`
		);
		await poll.react("👍");
		await poll.react("👎");
		await poll.react("🤷");
	}
};
