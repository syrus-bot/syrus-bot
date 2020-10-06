exports.run = (client, msg, args) => {
    const Discord = require("discord.js");
    if (msg.mentions.roles.first()) {
        if (!msg.member.hasPermission(["MANAGE_ROLES"])) return msg.channel.send("You must have the **Manage Roles** permission to use this command!");
        if (!msg.guild.me.hasPermission(["MANAGE_ROLES"])) return msg.channel.send("I am missing the **Manage Roles** permission and therefore can't run this command");
        if (msg.member.roles.highest.position < msg.mentions.roles.first().position) return msg.channel.send("You can't delete this role because it is higher than your current highest role.");

        msg.mentions.roles
            .first()
            .delete()
            .then((done) => {
                msg.channel.send("Successfully deleted the role **" + msg.mentions.roles.first().name + "**");
            })
            .catch((error) => {
                msg.channel.send("I was unable to delete this role. Please move my role above the role you are trying to delete.");
            });
    } else if (Number(args[0])) {
        if (!msg.member.hasPermission(["MANAGE_ROLES"])) return msg.channel.send("You must have the **Manage Roles** permission to use this command!");
        if (!msg.guild.me.hasPermission(["MANAGE_ROLES"])) return msg.channel.send("I am missing the **Manage Roles** permission and therefore can't run this command");
        var role = msg.guild.roles.cache.get(args[0]);
        if (role === undefined || role === null) return msg.channel.send('I was unable to locate the role id "' + args[0] + '"');
        if (msg.member.roles.highest.position < role.position) return msg.channel.send("You can't delete this role because it is higher than your current highest role.");
        role.delete()
            .then((done) => {
                msg.channel.send("Successfully deleted the role **" + msg.mentions.roles.first().name + "**");
            })
            .catch((error) => {
                msg.channel.send("I was unable to delete this role. Please move my role above the role you are trying to delete.");
            });
    } else if (args[0]) {
        if (!msg.member.hasPermission(["MANAGE_ROLES"])) return msg.channel.send("You must have the **Manage Roles** permission to use this command!");
        if (!msg.guild.me.hasPermission(["MANAGE_ROLES"])) return msg.channel.send("I am missing the **Manage Roles** permission and therefore can't run this command");
        var role = msg.guild.roles.cache.find((role) => role.name.toLowerCase() === args[0].toLowerCase());
        if (role === undefined || role === null) return msg.channel.send('I was unable to locate the role name "' + args[0] + '"');
        if (msg.member.roles.highest.position < role.position) return msg.channel.send("You can't delete this role because it is higher than your current highest role.");
        role.delete()
            .then((done) => {
                msg.channel.send("Successfully deleted the role **" + msg.mentions.roles.first().name + "**");
            })
            .catch((error) => {
                msg.channel.send("I was unable to delete this role. Please move my role above the role you are trying to delete.");
            });
    } else {
        msg.channel.send("You need to include the role you want me to delete!");
    }
};
