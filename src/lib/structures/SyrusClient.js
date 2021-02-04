const { SapphireClient } = require("@sapphire/framework");
const { Store } = require("@sapphire/pieces");
const CommandStore = require("@struct/CommandStore");
const DB = require("@data/MongoDB");
const MusicManager = require("@struct/MusicManager");

require("@sapphire/plugin-i18next/register-discordjs");
require("@sapphire/plugin-logger/register");

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

module.exports = class SyrusClient extends SapphireClient {
	constructor(options, flaresDirectory, config) {
		super({...options});

		this.stores.deregister(this.commands);
		this.stores.register(new CommandStore());
		this.stores.registerUserDirectories(flaresDirectory);

		this.music = null;
		this.settings = null;

		this.fetchPrefix = fetchPrefix.bind(this);
		this.fetchLanguage = fetchLanguage.bind(this);

		this.logger.info("Client initialized. Logging in...");

		this.once("ready", this.connectMusic.bind(this, config));
		this.once("ready", this.connectMongo.bind(this, config));
	}

	connectMusic(config) {
		this.music = new MusicManager(this, config);
	}

	connectMongo(config) {
		const { user, pass, host, port, base } = config.database;
		const mongo = `mongodb://${user}:${pass}@${host}:${port}/${base}`;
		this.settings = new DB(this, mongo, config);
	}

	get commands() {
		return this.stores.get("commands");
	}

	get events() {
		return this.stores.get("events");
	}

	get preconditions() {
		return this.stores.get("preconditions");
	}

	get arguments() {
		return this.stores.get("arguments");
	}
};
