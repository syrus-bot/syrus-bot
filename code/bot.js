const syrusClient = require('./lib/structures/syrusClient');
const config = require('./config.json');
const { LogLevel } = require('@sapphire/framework');
const fs = require("fs");

async function main() {
    const client = new syrusClient({
        fetchAllMembers: false,
        prefix: config.prefix,
        commandEditing: false,
        typing: true,
        providers: {
            default: "mongodb"
        },
        ws: {intents: ['GUILDS', 'GUILD_MESSAGES']},
        logger: {level: LogLevel.Debug}
    });
    
    fs.readdir("./events/", (err, files) => {
        if (err) return console.error(err);
        files.forEach(file => {
            const evnt = require(`./events/${file}`);
            let eventName = file.split(".")[0];
            client.on(eventName, evnt.bind(null, client));
        });
    });
    
    try {
        await client.login(config.token);
    } catch (error) {
        client.destroy();
        throw error;
    }
}

main().catch(console.error);