
const { Args, Command, CommandOptions } = require('@sapphire/framework');


module.exports = class ClientCommand extends Command {
    constructor(context) {
        super(context, {
            name: "vote",
            description: "raise a vote for something"
        });
    }
    
    async run(msg) {
        const get_pre = require('../../config.json');
        const args = msg.content.slice(get_pre.prefix.length).split(/ +/g);
    const config = require("../../config.json");
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
}