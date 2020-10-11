
const { Args, Command, CommandOptions } = require('@sapphire/framework');


module.exports = class ClientCommand extends Command {
    constructor(context) {
        super(context, {
            name: "sus",
            description: "someone sus? use this command!"
        });
    }
    
    async run(msg) {
        const get_pre = require('../../config.json');
        const args = msg.content.slice(get_pre.prefix.length).split(/ +/g);
    const Discord = require("discord.js");
    const options = ["was not", "was"];
    const imposter = Math.floor(Math.random() * options.length);
    if (msg.mentions.members.first()) {
        msg.channel.send(
            `
            .      　。　　　　•　    　ﾟ　　。
            　　.　　　.　　　  　　.　　　　　。　　   。　.
             　.　　      。　        ඞ   。　    .    •
             •                **${msg.mentions.members.first().user.username} ${options[imposter]} An Impostor.**　 。　.
                                  1 impostor remains
            　 　　。　　　　　　ﾟ　　　.　　　　　.
            ,　　　　.　 .　　       .               。
            `
        );
    } else {
        msg.channel.send(
            `
           .      　。　　　　•　    　ﾟ　　。
           　　.　　　.　　　  　　.　　　　　。　　   。　.
            　.　　      。　        ඞ   。　    .    •
            •                **${msg.author.username} ${options[imposter]} An Impostor.**　 。　.
                                 1 impostor remains
           　 　　。　　　　　　ﾟ　　　.　　　　　.
           ,　　　　.　 .　　       .               。
           `
        );
    }
};

}