exports.run = (client, msg, args) => {
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
