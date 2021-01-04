require("module-alias/register");

const SyrusClient = require("@struct/SyrusClient");
const config = require("@sky/config.json");
const { LogLevel } = require("@sapphire/framework");

async function main() {
	const client = new SyrusClient({
		ws: {intents: ["GUILDS", "GUILD_MESSAGES", "GUILD_VOICE_STATES"]},
		logger: {level: LogLevel.Debug},
		disableMentions: "everyone",
		baseUserDirectory: null,
		i18n: {
			defaultMissingKey: "missing",
			defaultNS: "global",
			i18next: {
				preload: ["en-us"],
				load: "currentOnly",
				lowerCaseLng: true,
				fallbackLng: "en-us",
				initImmediate: false,
				interpolation: {
					escapeValue: false
				}
			}
		}
	}, `${__dirname}/flares`, config);

	try {
		await client.login(config.token);
	} catch (error) {
		client.destroy();
		throw error;
	}
}

main().catch(console.error);
