exports.run = (client, msg, args) => {
    const Discord = require("discord.js");
    if (msg.mentions.members.first()) {
        if (!msg.member.hasPermission(["BAN_MEMBERS"])) return msg.channel.send("You must have the **Ban Members** permission to use this command!");
        if (!msg.guild.me.hasPermission(["BAN_MEMBERS"])) return msg.channel.send("I am missing the **Ban Members** permission and therefore can't run this command");
        if (msg.member.roles.highest.position < msg.mentions.members.first().roles.highest.position) return msg.channel.send("You can't ban this user because they have a higher role than you!");
        if (args[1]) {
            if (args[1].length > 300) return msg.channel.send("Reasons can't acceed 300 characters.");
        }
        msg.mentions.members
            .first()
            .ban("User banned by " + msg.author.username)
            .then((member) => {
                msg.channel.send(`**${member.user.username}** has been banned. :wave:`);
            })
            .catch((error) => {
                if (error.toString().includes("Missing Perm")) return msg.channel.send("I was unable to ban this user. Please move my role above the role of the user you are trying to ban.");
            });
    } else if (Number(args[0])) {
        if (!msg.member.hasPermission(["BAN_MEMBERS"])) return msg.channel.send("You must have the **Ban Members** permission to use this command!");
        if (!msg.guild.me.hasPermission(["BAN_MEMBERS"])) return msg.channel.send("I am missing the **Ban Members** permission and therefore can't run this command");
        if (args[1]) {
            if (args[1].length > 300) return msg.channel.send("Reasons can't acceed 300 characters.");
        }
        var person = msg.guild.members.cache.get(args[0]);
        if (person === undefined || person === null) return msg.channel.send('I was unable to find a member with the id "' + args[0] + '"');
        if (msg.member.roles.highest.position < person.roles.highest.position) return msg.channel.send("You can't ban this user because they have a higher role than you!");
        person
            .ban("User banned by " + msg.author.username)
            .then((member) => {
                msg.channel.send(`**${member.user.username}** has been banned. :wave:`);
            })
            .catch((error) => {
                if (error.toString().includes("Missing Perm")) return msg.channel.send("I was unable to ban this user. Please move my role above the role of the user you are trying to ban.");
            });
    }
};
