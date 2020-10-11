
const { Args, Command, CommandOptions } = require('@sapphire/framework');


module.exports = class ClientCommand extends Command {
    constructor(context) {
        super(context, {
            name: "pp",
            description: "peepee size thing"
        });
    }
    
    async run(msg) {
        const get_pre = require('../../config.json');
        const args = msg.content.slice(get_pre.prefix.length).split(/ +/g);
    const Discord = require("discord.js");
    const sizes = ["8D", "8=D", "8==D", "8===D", "8====D", "8=====D", "8======D", "8=======D", "8========D"];
    const size = Math.floor(Math.random() * sizes.length);
    if (msg.mentions.members.first()) {
        msg.channel.send(
            new Discord.MessageEmbed()
                .setColor("#34eb7d")
                .setTitle(msg.mentions.members.first().user.username + "'s PeePee")
                .setDescription("**" + sizes[size] + "**")
        );
    } else {
        msg.channel.send(
            new Discord.MessageEmbed()
                .setColor("#34eb7d")
                .setTitle(msg.author.username + "'s PeePee")
                .setDescription("**" + sizes[size] + "**")
        );
    }
};

}