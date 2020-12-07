const mongoose = require("mongoose");
const config = require("../config.json");

const moduleSchema = new mongoose.Schema({
	enabled: {type: Boolean, default: true},
	disabledCommands: [String],
	settings: {}
});

const guildSchema = new mongoose.Schema({
	_id: Number,
	prefix: String,
	language: String,
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

module.exports = class {
	constructor(...args) {
		const connection = {
			host: config.database.host,
			port: config.database.port,
			data: config.database.base,
			user: config.database.user,
			pass: config.database.pass,
			options: {
				useNewUrlParser: true,
				useUnifiedTopology: true
			}
		};
		this.db = mongoose.createConnection(
			`mongodb://${connection.user}:${connection.pass}@${connection.host}:${connection.port}/${connection.data}`,
			connection.options
		);
		this.db.startSession();
		this.db.on("connected", () => {
			console.log("Database connected!");
		});
		this.GuildSchema = this.db.model("Guild", guildSchema);
	}

	cleanup () {
		console.log("Disconnecting from the database...");
		this.db.close();
	}

	async global() {
		const collection = this.db.collection("global");
		const global = await collection.findOne({_id: 0});
		if (global === null) {
			const docs = await collection
				.insertOne({
					_id: 0,
					prefix: config.prefix,
					token: config.token,
					language: "en-us"
				});
			return docs.ops[0];
		}
		return global;
	}

	async guild(id) {
		const guild = await this.GuildSchema.findById(Number(id)).exec();
		if (guild === null) {
			const doc = new this.GuildSchema({_id: Number(id)});
			return await doc.save()
		}
		return guild;
	}

	async guildDelete(id) {
		await this.GuildSchema.findByIdAndDelete(Number(id)).exec();
	}
}
