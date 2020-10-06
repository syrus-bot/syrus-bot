const { Args, Command, CommandOptions } = require('@sapphire/framework');


module.exports = class ClientCommand extends Command {
    constructor(context) {
        super(context, {
            name: "ping",
            description: "Pong!"
        });
    }
    
    async run(message) {
        const msg = await message.channel.send('Pong?');
        await msg.edit(`Pong! (Roundtrip took: ${(msg.editedTimestamp || msg.createdTimestamp) - (message.editedTimestamp || message.createdTimestamp)}ms. Heartbeat: ${Math.round(this.client.ws.ping)}ms.)`);
    }
};