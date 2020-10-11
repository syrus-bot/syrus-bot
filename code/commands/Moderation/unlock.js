
const { Args, Command, CommandOptions } = require('@sapphire/framework');


module.exports = class ClientCommand extends Command {
    constructor(context) {
        super(context, {
            name: "unlock",
            description: "unlock so people can talk after a lockdown"
        });
    }
    
    async run(msg) {
        const get_pre = require('../../config.json');
        const args = msg.content.slice(get_pre.prefix.length).split(/ +/g);
    const config = require("../../config.json");
    const Discord = require("discord.js");
    if (!msg.member.hasPermission(["MANAGE_CHANNELS"])) return msg.channel.send("You must have the **Manage Channels** permission to use this command!");
    if (!msg.guild.me.hasPermission(["MANAGE_CHANNELS"])) return msg.channel.send("I am missing the **Manage Channels** permission and therefore can't run this command");
    msg.channel.updateOverwrite(msg.channel.guild.roles.everyone, { SEND_MESSAGES: true });
    msg.channel.send(':unlock: Unlocked **#' + msg.channel.name + '**.')
};

}