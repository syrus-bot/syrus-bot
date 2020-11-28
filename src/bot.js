const SyrusClient = require("./lib/structures/SyrusClient");
const config = require("./config.json");
const { LogLevel } = require("@sapphire/framework");

async function main() {
	const client = new SyrusClient({
		ws: {intents: ["GUILDS", "GUILD_MESSAGES", "GUILD_VOICE_STATES"]},
		logger: {level: LogLevel.Debug},
		disableMentions: "everyone"
	});

	try {
		await client.login(config.token);
	} catch (error) {
		client.destroy();
		throw error;
	}
}

main().catch(console.error);
