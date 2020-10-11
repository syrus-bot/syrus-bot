
const { Args, Command, CommandOptions } = require('@sapphire/framework');


module.exports = class ClientCommand extends Command {
    constructor(context) {
        super(context, {
            name: "avatar",
            description: "view someones avatar"
        });
    }
    
    async run(msg) {
        const get_pre = require('../../config.json');
        const args = msg.content.slice(get_pre.prefix.length).split(/ +/g);
    const Discord = require("discord.js");
    if (msg.mentions.members.first()) {
        console.log(msg.mentions.members.first().user);
        msg.channel.send(
            new Discord.MessageEmbed()
                .setColor("#34eb7d")
                .setTitle(msg.mentions.members.first().user.username + "'s Avatar")
                .setDescription(
                    `
    [.GIF](https://cdn.discordapp.com/avatars/${msg.mentions.members.first().id}/${msg.mentions.members.first().user.avatar}.gif) | [.PNG](https://cdn.discordapp.com/avatars/${msg.mentions.members.first().id}/${
                        msg.mentions.members.first().user.avatar
                    }.png) | [.JPEG](https://cdn.discordapp.com/avatars/${msg.mentions.members.first().id}/${msg.mentions.members.first().user.avatar}.jpeg) | [.JPG](https://cdn.discordapp.com/avatars/${msg.mentions.members.first().id}/${
                        msg.mentions.members.first().user.avatar
                    }.jpg) | [.WEBP](https://cdn.discordapp.com/avatars/${msg.mentions.members.first().id}/${msg.mentions.members.first().user.avatar}.webp)`
                )
                .setImage(`https://cdn.discordapp.com/avatars/${msg.mentions.members.first().id}/${msg.mentions.members.first().user.avatar}.png`)
        );
    } else if (Number(args[1])) {
        var person = msg.guild.members.cache.get(args[1]);
        if (person === undefined || person === null) return msg.channel.send('I was unable to find a member with the id "' + args[1] + '"');
        msg.channel.send(
            new Discord.MessageEmbed()
                .setColor("#34eb7d")
                .setTitle(person.user.username + "'s Avatar")
                .setDescription(
                    `
    [.GIF](https://cdn.discordapp.com/avatars/${person.id}/${person.user.avatar}.gif) | [.PNG](https://cdn.discordapp.com/avatars/${person.id}/${person.user.avatar}.png) | [.JPEG](https://cdn.discordapp.com/avatars/${person.id}/${person.user.avatar}.jpeg) | [.JPG](https://cdn.discordapp.com/avatars/${person.id}/${person.user.avatar}.jpg) | [.WEBP](https://cdn.discordapp.com/avatars/${person.id}/${person.user.avatar}.webp)`
                )
                .setImage(`https://cdn.discordapp.com/avatars/${person.id}/${person.user.avatar}.png`)
        );
    } else if (args[1]) {
        var person3 = msg.guild.members.cache.find((m) => m.displayName.toLowerCase() === args[1].toLowerCase());
        if (person3 === undefined) return msg.channel.send('I was unable to find a member with the username/nickname "' + args[1] + '"');
        msg.channel.send(
            new Discord.MessageEmbed()
                .setColor("#34eb7d")
                .setTitle(person3.user.username + "'s Avatar")
                .setDescription(
                    `
        [.GIF](https://cdn.discordapp.com/avatars/${person3.id}/${person3.user.avatar}.gif) | [.PNG](https://cdn.discordapp.com/avatars/${person3.id}/${person3.user.avatar}.png) | [.JPEG](https://cdn.discordapp.com/avatars/${person3.id}/${person3.user.avatar}.jpeg) | [.JPG](https://cdn.discordapp.com/avatars/${person3.id}/${person3.user.avatar}.jpg) | [.WEBP](https://cdn.discordapp.com/avatars/${person3.id}/${person3.user.avatar}.webp)`
                )
                .setImage(`https://cdn.discordapp.com/avatars/${person3.id}/${person3.user.avatar}.png`)
        );
    }
};

}