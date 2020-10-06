exports.run = async (client, message, args) => {
    const msg = await message.channel.send("Pong?");
    return msg.edit(`Pong! (Roundtrip took: ${(msg.editedTimestamp || msg.createdTimestamp) - (message.editedTimestamp || message.createdTimestamp)}ms. Heartbeat: ${Math.round(client.ws.ping)}ms.)`);
};