exports.run = (client, msg, args) => {
    const config = require("../config.json");
    const Discord = require("discord.js");

    if (!msg.member.hasPermission(["MANAGE_MESSAGES"])) return msg.channel.send("You must have the **Manage Messages** permission to purge messages");
    if (!msg.guild.me.hasPermission(["MANAGE_MESSAGES"])) return msg.channel.send("I am missing the **Manage Messages** permission and therefore can't run this command");

    if (!Number(args[0])) return msg.channel.send("Please provide a valid amount of messages to purge! i.e: `" + config.prefix + "purge 10`");
    msg.delete().then(() => {
        var amount = Number(args[0]);
        msg.channel.messages
            .fetch({ limit: amount })
            .then((messages) => {
                msg.channel.bulkDelete(messages).then(() => {
                    msg.channel.send(`**Successfully purged ${amount} messages.**`).then((mss) => {
                        setTimeout(function () {
                            mss.delete();
                        }, 2900);
                    });
                });
            })
            .catch(console.error);
    });
};
