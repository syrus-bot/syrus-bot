const assert = require("assert");
const mocha = require("mocha");
const DB = require("../src/providers/mongodb");
const mongoose = require("mongoose");

const { MongoMemoryServer } = require("mongodb-memory-server");
const mongod = new MongoMemoryServer();

describe("mongodb", function() {
	this.slow(50);
	this.timeout(100);
	let db;

	before(async function() {
		this.timeout(null);
		const uri = await mongod.getUri();
		db = new DB(uri, {prefix: "", token: ""});
		await db.GuildSchema.createCollection();
	});

	beforeEach(async () => {
		await db.GuildSchema.deleteMany({});
		await db.db.collection("global").deleteMany({});
	});

	after(async () => {
		db.cleanup();
		await mongod.stop();
	});

	it("should instantiate new guild", async () => {
		const guilds = db.db.collection("guilds");
		const mockGuild = await db.guild(1010);
		const foundGuild = await guilds.findOne({_id: 1010});

		assert.deepStrictEqual(foundGuild, mockGuild.toObject());
	});

	it("should find existing guild", async () => {
		const guilds = db.db.collection("guilds");
		const mockGuild = {
			_id: 1100,
			adminRoles: [1011],
			djRoles: [1001],
			modRoles: [1000]
		};
		await guilds.insertOne(mockGuild);
		const foundGuild = await db.guild(1100);

		assert.deepStrictEqual(foundGuild.toObject(), mockGuild);
	});

	it("should erase guild", async () => {
		const guilds = db.db.collection("guilds");
		const mockGuild = await db.guild(1111);

		assert.ok(mockGuild.toObject());
		
		const foundGuild = await guilds.findOne({_id: 1111});
		await db.guildDelete(1111);
		const noGuild = await guilds.findOne({_id: 1111});
		
		assert.notDeepStrictEqual(noGuild, foundGuild);
	});

	it("should instantiate new global", async () => {
		const global = db.db.collection("global");
	
		const mockGlobal = await db.global();
		const foundGlobal = await global.findOne({_id: 0});

		assert.deepStrictEqual(foundGlobal, mockGlobal);
	});

	it("should find existing global", async () => {
		const global = db.db.collection("global");
		mockGlobal = {_id: 0, dummyKey: 1111};
		await global.insertOne(mockGlobal);
		const foundGlobal = await db.global();

		assert.deepStrictEqual(foundGlobal, mockGlobal);
	});
});
