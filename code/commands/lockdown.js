exports.run = (client, msg, args) => {
    const config = require("../config.json");
    const Discord = require("discord.js");
    if (!msg.member.hasPermission(["MANAGE_CHANNELS"])) return msg.channel.send("You must have the **Manage Channels** permission to use this command!");
    if (!msg.guild.me.hasPermission(["MANAGE_CHANNELS"])) return msg.channel.send("I am missing the **Manage Channels** permission and therefore can't run this command");
    msg.channel.updateOverwrite(msg.channel.guild.roles.everyone, { SEND_MESSAGES: false });
    msg.channel.send(":lock: Locked down **#" + msg.channel.name + "**.");
};
