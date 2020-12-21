const assert = require("assert");
const mocha = require("mocha");
const DB = require("../src/providers/mongodb");
const mongoose = require("mongoose");

const { MongoMemoryServer } = require("mongodb-memory-server");
const mongod = new MongoMemoryServer();

const moduleSchema = new mongoose.Schema({
	enabled: {type: Boolean, default: true},
	disabledCommands: [String],
	settings: {}
});

const guildSchema = new mongoose.Schema({
	_id: Number,
	prefix: String,
	language: String,
	djRoles: [Number],
	modRoles: [Number],
	adminRoles: [Number],
	modules: {
		core: {type: moduleSchema},
		music: {type: moduleSchema},
		moderation: {type: moduleSchema},
		automod: {type: moduleSchema},
		utility: {type: moduleSchema},
		api: {type: moduleSchema},
		fun: {type: moduleSchema},
		info: {type: moduleSchema}
	}
});

describe("mongodb", function() {
	this.slow(1000);
	this.timeout(2000);
	let db;

	before(async () => {
		const uri = await mongod.getUri();
		db = new DB(uri);
		db.GuildSchema = db.db.model("MockGuild", guildSchema);
		db.GuildSchema.createCollection() 
	});

	beforeEach(async () => {
		await db.GuildSchema.deleteMany({});
	});

	after(async () => {
		db.db.dropCollection("mockguilds");
		db.cleanup();
		await mongod.stop();
	});

	it("should instantiate new guild", async () => {
		const guilds = db.db.collection("mockguilds");
		const mockGuild = await db.guild(1010);
		const foundGuild = await guilds.findOne({_id: 1010});

		assert.deepStrictEqual(foundGuild, mockGuild.toObject());
	});

	it("should find existing guild", async () => {
		const guilds = db.db.collection("mockguilds");
		const mockGuild = {
			_id: 1010,
			adminRoles: [1011],
			djRoles: [1001],
			modRoles: [1000]
		};
		await guilds.insertOne(mockGuild);
		const foundGuild = await db.guild(1010);

		assert.deepStrictEqual(foundGuild.toObject(), mockGuild);
	});

	it("should erase guild", async () => {
		const guilds = db.db.collection("mockguilds");
		const mockGuild = await db.guild(1010);
		assert.ok(mockGuild.toObject());
		const foundGuild = await guilds.findOne({_id: 1010});
		await db.guildDelete(1010);
		const noGuild = await guilds.findOne({_id: 1010});
		assert.notDeepStrictEqual(noGuild, foundGuild);
	});

	it("should instantiate new global", async () => {
		const global = db.db.collection("global");

		const oldGlobal = await global.findOneAndDelete({_id: 0});
		oldGlobal._id = 1010;
		await global.insertOne(oldGlobal);
	
		const mockGlobal = await db.global();
		const foundGlobal = await global.findOne({_id: 0});

		assert.notDeepStrictEqual(foundGlobal, oldGlobal);
		assert.deepStrictEqual(foundGlobal, mockGlobal);

		await global.deleteMany({});
		oldGlobal._id = 0;
		await global.insertOne(oldGlobal);
	});

	it("should find existing global", async () => {
		const global = db.db.collection("global");
		const foundGlobal = db.global();

		assert.ok(foundGlobal);
	});
});
