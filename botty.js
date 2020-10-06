const Discord = require('discord.js');
const client = new Discord.Client();
var fetch = require('node-fetch')

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

prefix = '>'
client.on('message', msg => {

    const args = msg.content.slice(prefix.length).split(/ +/g);
    const command = args.shift().toLowerCase();


    if (command === 'pwnd') {
        if (args[0]) {
        fetch('https://haveibeenpwned.com/unifiedsearch/' + args[0])
        .then(res => {
            console.log(res)
            if (res) {
                msg.channel.send('yep')
            } else {
                msg.channel.send('Nope')
            }

        });
        } else {
            msg.channel.send('Missing email argument')
        }

    }
    if (command.includes('test')) {
        var test = client.guilds.cache.get('760631311844507658')
        console.log(test)
        msg.channel.send(JSON.stringify(test).toString())
    }
    if (command.startsWith('avatar')) {
        if (msg.mentions.members.first()) {
            console.log(msg.mentions.members.first().user)
            msg.channel.send(new Discord.MessageEmbed().setColor('#34eb7d').setTitle(msg.mentions.members.first().user.username + "'s Avatar").setDescription(`
            [.GIF](https://cdn.discordapp.com/avatars/${msg.mentions.members.first().id}/${msg.mentions.members.first().user.avatar}.gif) | [.PNG](https://cdn.discordapp.com/avatars/${msg.mentions.members.first().id}/${msg.mentions.members.first().user.avatar}.png) | [.JPEG](https://cdn.discordapp.com/avatars/${msg.mentions.members.first().id}/${msg.mentions.members.first().user.avatar}.jpeg) | [.JPG](https://cdn.discordapp.com/avatars/${msg.mentions.members.first().id}/${msg.mentions.members.first().user.avatar}.jpg) | [.WEBP](https://cdn.discordapp.com/avatars/${msg.mentions.members.first().id}/${msg.mentions.members.first().user.avatar}.webp)`)
            .setImage(`https://cdn.discordapp.com/avatars/${msg.mentions.members.first().id}/${msg.mentions.members.first().user.avatar}.png`))
        } else if (Number(args[0])) {
            var person = msg.guild.members.get(args[0])
            msg.channel.send(`https://cdn.discordapp.com/avatars/${person.id}/${person.user.avatar}.png`)
        } else if (args[0]) {
            var person2 = msg.guild.members.cache.find(m => m.user.username === args[0]) 
            if (person2 === undefined) {
                var person3 = msg.guild.members.cache.find(m => m.displayName === args[0]) 
                if (person3 === undefined) return msg.channel.send('I was unable to find a member with the username/nickname "' + args[0] + '"')
                msg.channel.send(`https://cdn.discordapp.com/avatars/${person3.id}/${person3.user.avatar}.png`)
            } else {
                msg.channel.send(`I was unable to locate the user "${args[0]}"!`)
            }
        }
    }


  if (msg.content.startsWith('>mute')) {
    msg.channel.send('No muted role exists. Would you like me to create one?\n\nType `yes` or `no`')
    msg.channel.awaitMessages(m => m.author.id == msg.author.id,
        {max: 1, time: 40000}).then(async collected => {
                        msgg = collected.first()

    if (msgg.content.toLowerCase().startsWith('yes')) {
    msgg.guild.roles.create({
        data: {
          name: 'Muted',
          color: '#555454',
        },
        reason: 'Muted role created as a followup to a Syrus command.',
      })
        .then(console.log)
        .catch(console.error);
    }
        })
  }

});

client.login('NzYwNzAwMjc2NzA0ODA0ODk3.X3P3Vw.veSotTjziCwZZDBXAWtNvf_QgzU');