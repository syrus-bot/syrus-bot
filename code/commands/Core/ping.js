const { Args, Command, CommandOptions } = require('@sapphire/framework');


module.exports = class ClientCommand extends Command {
    constructor(context) {
        super(context, {
            name: "ping",
            description: "commands:ping.description"
        });
    }
    
    async run(message) {
        const msg = await message.sendTranslated('commands:ping.ping');
        await message.sendTranslated('commands:ping.pong', [
            {
                roundtrip: (msg.editedTimestamp || msg.createdTimestamp) - (message.editedTimestamp || message.createdTimestamp),
                heartbeat: Math.round(this.client.ws.ping)
            }
        ]);
        await msg.delete();
    }
};