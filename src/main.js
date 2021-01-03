require("module-alias/register");

const Discord = require("discord.js");
const Manager = new Discord.ShardingManager(require.resolve("@sky/bot"));
const config = require("@sky/config.json");
Manager.spawn(config.shards);

process.on("exit", () => {
	process.emit("cleanup");
});

process.on("SIGINT", () => {
	console.log("\nExiting...");
	process.exit(2);
});
process.on("uncaughtException", (error) => {
	console.log("Uncaught Exception:");
	console.error(error);
	if (process.env.NODE_ENV !== "production") {
		process.exit(99);
	}
});
