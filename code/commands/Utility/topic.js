
const { Args, Command, CommandOptions } = require('@sapphire/framework');


module.exports = class ClientCommand extends Command {
    constructor(context) {
        super(context, {
            name: "topic",
            description: "set the topic of a channel"
        });
    }
    
    async run(msg) {
        const get_pre = require('../../config.json');
        const args = msg.content.slice(get_pre.prefix.length).split(/ +/g);
    const config = require("../../config.json");
    const Discord = require("discord.js");
    var newtopic = msg.content.replace(config.prefix + "topic ", "");
    if (!msg.member.hasPermission(["MANAGE_CHANNELS"])) return msg.channel.send("You must have the **Manage Channels** permission to use this command!");
    if (!msg.guild.me.hasPermission(["MANAGE_CHANNELS"])) return msg.channel.send("I am missing the **Manage Channels** permission and therefore can't run this command");
    if (newtopic.includes("topic")) return msg.channel.send("You need to include what to change the channel topic to! i.e: `>topic This channel is for playing games!`");
    msg.channel
        .setTopic(newtopic)
        .then(() => {
            msg.channel.send(":speaking_head: Updated channel topic for **#" + msg.channel.name + "**");
        })
        .catch((error) => {
            console.log(error);
        });
};
}