exports.run = (client, msg, args) => {
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
