exports.run = (client, msg, args) => {
    const config = require("../config.json");
    const Discord = require("discord.js");
    const options = msg.content.replace(config.prefix + "choose ", "").split(",");
    if (options.length <= 1) return msg.channel.send("You need to provide options seperated by a comma (`,`)\ni.e: `" + config.prefix + "choose blue, green, red`");
    const choosen = Math.floor(Math.random() * options.length);

    msg.channel.send("Hey " + msg.author.username + ", I have choosen `" + options[choosen] + "`");
};
