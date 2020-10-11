
const { Args, Command, CommandOptions } = require('@sapphire/framework');


module.exports = class ClientCommand extends Command {
    constructor(context) {
        super(context, {
            name: "reload",
            description: "reload cmd"
        });
    }
    
    async run(msg) {
        const get_pre = require('../../config.json');
        const args = msg.content.slice(get_pre.prefix.length).split(/ +/g);
    if (!args || args.length < 1) return msg.channel.send("You need to provide a command name to reload.");
    const commandName = args[1];
    if (!this.client.commands.has(commandName)) {
        return msg.channel.send(`There is no ${commandName} command, sorry :(`);
    }
    delete require.cache[require.resolve(`${process.cwd()}/commands/${commandName}.js`)];
    this.client.commands.delete(commandName);
    const props = require(`${process.cwd()}/commands/${commandName}.js`);
    this.client.commands.set(commandName, props);
    msg.channel.send(`The ${commandName} command has been reloaded! Happy to help :)`);
};
}