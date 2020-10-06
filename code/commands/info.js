exports.run = (client, msg, args) => {
    const Discord = require("discord.js");
    if (msg.mentions.members.first()) {
        var date = new Date(msg.mentions.members.first().user.createdAt)
        if (msg.guild.owner.id === msg.mentions.members.first().id) { owner = 'true' }
        if (msg.guild.owner.id != msg.mentions.members.first().id) { owner = 'false' }
        msg.channel.send(
            new Discord.MessageEmbed()
            .setColor('#4287f5')
            .setAuthor(`${msg.mentions.members.first().user.username + '#' + msg.mentions.members.first().user.discriminator}`, `https://cdn.discordapp.com/avatars/${msg.mentions.members.first().id}/${msg.mentions.members.first().user.avatar}.png`)
            .addField('Account Age', date.getMonth().toString() + '/' + date.getDay().toString() + '/' + date.getFullYear().toString(), true)
            .addField('User Badges', 'soon', true)
            .addField('Nickname', msg.mentions.members.first().displayName, true)

            .addField('Roles', msg.mentions.members.first().displayName, true)
            .addField('Server Owner', owner || 'false', true)
            .addField('Highest Role', msg.mentions.members.first().roles.highest.name, true)
        )
    } else if (Number(args[0])) {
        var person = msg.guild.members.cache.get(args[0]);
        if (person === undefined || person === null) return msg.channel.send('I was unable to find a member with the id "' + args[0] + '"');
        
    } else if (args[0]) {
        var person3 = msg.guild.members.cache.find((m) => m.displayName.toLowerCase() === args[0].toLowerCase());
        if (person3 === undefined) return msg.channel.send('I was unable to find a member with the username/nickname "' + args[0] + '"');
       
    }
};
