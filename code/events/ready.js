module.exports = (client) => {
    console.log(`Successfully initialized. Ready to serve ${client.guilds.cache.size} guilds.`);
    client.user.setPresence({activity: {name: `over ${client.guilds.cache.size} servers! | syrus.gg`, type: "WATCHING"}, status: "dnd"});
}