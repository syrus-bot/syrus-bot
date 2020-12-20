const SyrusCommand = require("../../lib/structures/SyrusCommand");
const { MessageEmbed } = require("discord.js");

module.exports = class ClientCommand extends SyrusCommand {
	constructor(context) {
		super(context, {
			name: "avatar",
			description: "utilities:avatar.description",
			preconditions: ["GuildOnly"]
		});
	}

	async run(message, args) {
		const member = await args.pickResult("member");
		let target;
		if (member.success) {
			target = member.value;
		} else {
			target = message.member;
		}
		const url = target.user.avatarURL({format: "png", dynamic: true});
		message.channel.send(
			new MessageEmbed()
				.setColor("#34eb7d")
				.setTitle(`${target.user.username}'s Avatar`)
				.setDescription(`[CLICK HERE FOR LINK](${url})`)
				.setImage(url)
		);
	}
};
