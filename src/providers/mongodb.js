const mongoose = require("mongoose");

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

const defaultConfig = {
	database: {
		host: "127.0.0.1",
		port: "27017",
		base: "syrus",
		user: "",
		pass: ""
	},
	prefix: "",
	token: ""
};

module.exports = class {
	constructor(uri, config) {
		this.config = config ?? defaultConfig;
		const connection = {
			host: this.config.database.host,
			port: this.config.database.port,
			data: this.config.database.base,
			user: this.config.database.user,
			pass: this.config.database.pass,
			options: {
				useNewUrlParser: true,
				useUnifiedTopology: true
			}
		};
		this.db = mongoose.createConnection(
			uri ?? `mongodb://${connection.user}:${connection.pass}@${connection.host}:${connection.port}/${connection.data}`,
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
					prefix: this.config.prefix,
					token: this.config.token,
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
			return await doc.save();
		}
		return guild;
	}

	async guildDelete(id) {
		await this.GuildSchema.findByIdAndDelete(Number(id)).exec();
	}
};
