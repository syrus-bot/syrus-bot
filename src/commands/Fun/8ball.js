const SyrusCommand = require("../../lib/structures/SyrusCommand");
const { MessageEmbed } = require("discord.js");
const ANSWERS = [
	"It is certain.",
	"It is decidedly so.",
	"Without a doubt.",
	"Yes, definitely.",
	"You may rely on it.",
	"As I see it, yes.",
	"Most likely.",
	"Outlook good.",
	"Yes.",
	"Signs point to yes.",
	"Don't count on it.",
	"My reply is no.",
	"My sources say no.",
	"Outlook not so good.",
	"Very doubtful.",
	"Reply hazy, try again.",
	"Ask again later.",
	"Better not tell you now.",
	"Cannot predict now.",
	"Concentrate and ask again."
];

module.exports = class ClientCommand extends SyrusCommand {
	constructor(context) {
		super(context, {
			name: "8ball",
			aliases: ["eightball", "magic8ball"],
			description: "fun:8ball.description"
		});
	}

	async run(message, args) {
		const question = await args.restResult("string");
		if (!question.success) {
			return message.channel.send(
				new MessageEmbed()
					.setColor("#F04947")
					.setTitle(await message.fetchLanguageKey(
						"fun:8ball.no-q-err.title"
					))
					.setDescription(await message.fetchLanguageKey(
						"fun:8ball.no-q-err.description"
					))
			);
		}
		const answer = ANSWERS[Math.floor(Math.random() * ANSWERS.length)];
		message.channel.send(
			new MessageEmbed()
				.setColor("#57309D")
				.setTitle("Magic 8 Ball")
				.setDescription(`**Question:** \`${question.value}\`\n**Answer:** \`${answer}\``)
		);
	}
};
