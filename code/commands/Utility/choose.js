
const { Args, Command, CommandOptions } = require('@sapphire/framework');


module.exports = class ClientCommand extends Command {
    constructor(context) {
        super(context, {
            name: "choose",
            description: "make the bot choose something"
        });
    }
    
    async run(msg) {
        const get_pre = require('../../config.json');
        const args = msg.content.slice(get_pre.prefix.length).split(/ +/g);
    const config = require("../../config.json");
    const Discord = require("discord.js");
    const options = msg.content.replace(config.prefix + "choose ", "").split(",");
    if (options.length <= 1) return msg.channel.send("You need to provide options seperated by a comma (`,`)\ni.e: `" + config.prefix + "choose blue, green, red`");
    const choosen = Math.floor(Math.random() * options.length);

    msg.channel.send("Hey " + msg.author.username + ", I have choosen `" + options[choosen] + "`");
};
}