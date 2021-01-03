const SyrusCommand = require("@struct/SyrusCommand");
const config = require("@sky/config.json");
const got = require("got");
const { MessageEmbed, MessageAttachment } = require("discord.js");

async function getWikiHow() {
	const response = await got(
		"https://api.ksoft.si/images/random-wikihow", {
			headers: {
				"Authorization": `Bearer ${config.tokens.ksoftsi}`
			}
		}
	);
	const json = await JSON.parse(response.body);
	return json;
}

module.exports = class ClientCommand extends SyrusCommand {
	constructor(context) {
		super(context, {
			name: "wikihow",
			aliases: ["randomwiki"],
			description: "fun:wikihow.description"
		});
	}

	async run(message, args) {
		const fetched = await getWikiHow();
		const image = new MessageAttachment(fetched.url, `${message.author.username}_ran_this_command_from_Syrus.png`);
		return message.channel.send(
			new MessageEmbed()
				.setTitle(`From Article: __${fetched.title}__`)
				.setURL(fetched.article_url)
				.setDescription(`[Visit the article here](${fetched.article_url})`)
				.attachFiles(image)
				.setImage(`attachment://${message.author.username}_ran_this_command_from_Syrus.png`)
				.setColor("#4353E0")
		);
	}
};
