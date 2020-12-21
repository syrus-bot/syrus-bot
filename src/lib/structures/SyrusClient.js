const { SapphireClient } = require("@sapphire/framework");
const CommandStore = require("./CommandStore");
const DB = require("../../providers/mongodb.js");
const MusicManager = require("./MusicManager.js");
/* eslint-disable no-inline-comments, line-comment-position */
const { i18next } = require("i18next"); // lgtm [js/unused-local-variable]
const in17n = require("@scp/in17n/register"); // lgtm [js/unused-local-variable]
/* eslint-enable no-inline-comments, line-comment-position */

async function fetchPrefix(message) {
	const guild = await this.settings.guild(message.guild.id);
	if (guild.prefix !== undefined) {
		return guild.prefix;
	}
	const global = await this.settings.global();
	return global.prefix;
}

async function fetchLanguage(message) {
	const guild = await this.settings.guild(message.guild.id);
	if (guild.language !== undefined) {
		return guild.language;
	}
	const global = await this.settings.global();
	return global.language;
}

async function connectMusic(config) {
	this.music = new MusicManager(this, config);
}

module.exports = class SyrusClient extends SapphireClient {
	constructor(options, config) {
		super({
			...options,
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
		});
		this.commands = new CommandStore(this)
			.registerPath(`${process.cwd()}/commands/`);
		this.music = null;
		this.registerStore(this.commands);
		const { user, pass, host, port, base } = config.database;
		const mongo = `mongodb://${user}:${pass}@${host}:${port}/${base}`;
		this.settings = new DB(mongo, config);

		this.fetchPrefix = fetchPrefix.bind(this);
		this.fetchLanguage = fetchLanguage.bind(this);

		this.once("ready", connectMusic.bind(this, config));
	}
};
