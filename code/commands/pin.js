exports.run = (client, msg, args) => {
    const config = require("../config.json");
    const Discord = require("discord.js");

    if (!msg.member.hasPermission(["MANAGE_MESSAGES"])) return msg.channel.send("You must have the **Manage Messages** permission to pin messages");
    if (!msg.guild.me.hasPermission(["MANAGE_MESSAGES"])) return msg.channel.send("I am missing the **Manage Messages** permission and therefore can't run this command");
    msg.channel.messages
        .fetch({ limit: 2 })
        .then((messages) => {
            let lastMessage = messages.last();
            lastMessage.pin();
        })
        .catch(console.error);
};
