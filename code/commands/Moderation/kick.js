
const { Args, Command, CommandOptions } = require('@sapphire/framework');


module.exports = class ClientCommand extends Command {
    constructor(context) {
        super(context, {
            name: "kick",
            description: "boot someone outta here"
        });
    }
    
    async run(msg) {
        const get_pre = require('../../config.json');
        const args = msg.content.slice(get_pre.prefix.length).split(/ +/g);
    const Discord = require("discord.js");
    if (msg.mentions.members.first()) {
        if (!msg.member.hasPermission(["KICK_MEMBERS"])) return msg.channel.send("You must have the **Kick Members** permission to use this command!");
        if (!msg.guild.me.hasPermission(["KICK_MEMBERS"])) return msg.channel.send("I am missing the **Kick Members** permission and therefore can't run this command");
        if (msg.member.roles.highest.position < msg.mentions.members.first().roles.highest.position) return msg.channel.send("You can't kick this user because they have a higher role than you!");
        if (args[2]) {
            if (args[2].length > 300) return msg.channel.send("Reasons can't acceed 300 characters.");
        }
        msg.mentions.members
            .first()
            .kick("User kicked by " + msg.author.username)
            .then((member) => {
                msg.channel.send(`**${member.user.username}** has been kicked. :wave:`);
            })
            .catch((error) => {
                if (error.toString().includes("Missing Perm")) return msg.channel.send("I was unable to kick this user. Please move my role above the role of the user you are trying to kick.");
            });
    } else if (Number(args[1])) {
        if (!msg.member.hasPermission(["KICK_MEMBERS"])) return msg.channel.send("You must have the **Kick Members** permission to use this command!");
        if (!msg.guild.me.hasPermission(["KICK_MEMBERS"])) return msg.channel.send("I am missing the **Kick Members** permission and therefore can't run this command");
        if (args[2]) {
            if (args[2].length > 300) return msg.channel.send("Reasons can't acceed 300 characters.");
        }
        var person = msg.guild.members.cache.get(args[1]);
        if (person === undefined || person === null) return msg.channel.send('I was unable to find a member with the id "' + args[1] + '"');
        if (msg.member.roles.highest.position < person.roles.highest.position) return msg.channel.send("You can't kick this user because they have a higher role than you!");
        person
            .kick("User kicked by " + msg.author.username)
            .then((member) => {
                msg.channel.send(`**${member.user.username}** has been kicked. :wave:`);
            })
            .catch((error) => {
                if (error.toString().includes("Missing Perm")) return msg.channel.send("I was unable to kick this user. Please move my role above the role of the user you are trying to kick.");
            });
    }
};

}