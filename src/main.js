const Discord = require("discord.js");
const Manager = new Discord.ShardingManager("./bot.js");
const config = require("./config.json");
Manager.spawn(config.shards);
