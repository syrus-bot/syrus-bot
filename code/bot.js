const syrusClient = require('./lib/structures/syrusClient');
const config = require('./config.json');
const { LogLevel } = require('@sapphire/framework');

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
    
    try {
        await client
            .login(config.token)
            .then(() => {
                console.log(`Successfully initialized. Ready to serve ${client.guilds.cache.size} guilds.`);
                client.user.setPresence({activity: {name: `over ${client.guilds.cache.size} servers! | syrus.gg`, type: "WATCHING"}, status: "dnd"})
                    .catch(console.error);
            })
            .catch((error) => {
                throw `Failed to login to Discord: ${error}`;
            });
    } catch (error) {
        client.destroy();
        throw error;
    }
}

main().catch(console.error);