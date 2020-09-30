const syrusClient = require('./lib/structures/syrusClient');
const config = require('./config.json');

new syrusClient({
    fetchAllMembers: false,
    prefix: config.prefix,
    commandEditing: false,
    typing: true,
    providers: {
        default: "mongodb"
    },
    commandLogging:true,
    readyMessage: (client) => `Successfully initialized. Ready to serve ${client.guilds.size} guilds.`
}).login(config.token);
