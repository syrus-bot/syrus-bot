const Discord = require("discord.js");
const Manager = new Discord.ShardingManager("./bot.js");
const config = require("./config.json");
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
	process.exit(99);
});
