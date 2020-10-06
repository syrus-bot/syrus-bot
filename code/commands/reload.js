exports.run = (client, msg, args) => {
    if (!args || args.length < 1) return msg.channel.send("You need to provide a command name to reload.");
    const commandName = args[0];
    if (!client.commands.has(commandName)) {
        return msg.channel.send(`There is no ${commandName} command, sorry :(`);
    }
    delete require.cache[require.resolve(`${process.cwd()}/commands/${commandName}.js`)];
    client.commands.delete(commandName);
    const props = require(`${process.cwd()}/commands/${commandName}.js`);
    client.commands.set(commandName, props);
    msg.channel.send(`The ${commandName} command has been reloaded! Happy to help :)`);
};
