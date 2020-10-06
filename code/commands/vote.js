exports.run = (client, msg, args) => {
    const config = require("../config.json");
    const Discord = require("discord.js");
    const vote = msg.content.replace(config.prefix + "vote ", "").split(",");
    if (!msg.guild.me.hasPermission(["ADD_REACTIONS"])) return msg.channel.send("I am missing the **Add Reactions** permission and therefore can't run this command");
    msg.channel.send(`**${msg.author.username + "#" + msg.author.discriminator}** asks: ${vote}`).then((message) => {
        message
            .react("👍")
            .then(() => {
                message.react("👎");
            })
            .then(() => {
                message.react("🤷");
            });
    });
};