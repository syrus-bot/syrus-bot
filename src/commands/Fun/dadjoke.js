const SyrusCommand = require("../../lib/structures/SyrusCommand");
const got = require("got");

async function getJoke() {
	try {
		const response = await got("https://icanhazdadjoke.com", {
			headers: {
				"user-agent": `SyrusDiscordBot/${process.env.npm_package_version} (+https://syrus.gg)`,
				"accept": "application/json"
			}
		});
		const json = await JSON.parse(response.body);
		return json.joke;
	} catch (err) {
		return `Error while trying to get joke.\n\`${err}\``;
	}
}


module.exports = class ClientCommand extends SyrusCommand {
	constructor(context) {
		super(context, {
			name: "dadjoke",
			aliases: ["djoke", "dad"],
			description: "fun:dadjoke.description"
		});
	}

	async run(message, args) {
		const fetched = await getJoke();
		return message.channel.send(fetched);
	}
};
