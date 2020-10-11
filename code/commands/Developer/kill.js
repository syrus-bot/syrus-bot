
const { Args, Command, CommandOptions } = require('@sapphire/framework');


module.exports = class ClientCommand extends Command {
    constructor(context) {
        super(context, {
            name: "kill",
            description: "eval cmd"
        });
    }
    
    async run(msg) {
    const config = require('../../config.json');
    if (!config.developers.includes(msg.author.id)) return msg.channel.send("Access denied! You don't have permission to use this command.")
    msg.channel.send(':wave: Shutting down...')
    setTimeout(function () {
        process.exit(1);
    }, 2000);
    }
}