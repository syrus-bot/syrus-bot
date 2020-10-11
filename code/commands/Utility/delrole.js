/*
    Syrus - a multipurpose Discord bot, designed to be the best so you don't need the rest.
    Copyright (C) 2020, Syrus Development Team (Nytelife26 / nytelife@protonmail.com, Logan Heinzelman, ColeCCI and mynameismrtime)
    
    This file is part of Syrus.
    
    Syrus is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    Syrus is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with Syrus.  If not, see <https://www.gnu.org/licenses/>.
*/

const { Args, Command, CommandOptions } = require('@sapphire/framework');

module.exports = class ClientCommand extends Command {
    constructor(context) {
        super(context, {
            name: "delrole",
            description: "delete a role"
        });
    }
    
    async run(msg) {
        const get_pre = require('../../config.json');
        const args = msg.content.slice(get_pre.prefix.length).split(/ +/g);
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
    } else if (Number(args[1])) {
        if (!msg.member.hasPermission(["MANAGE_ROLES"])) return msg.channel.send("You must have the **Manage Roles** permission to use this command!");
        if (!msg.guild.me.hasPermission(["MANAGE_ROLES"])) return msg.channel.send("I am missing the **Manage Roles** permission and therefore can't run this command");
        var role = msg.guild.roles.cache.get(args[1]);
        if (role === undefined || role === null) return msg.channel.send('I was unable to locate the role id "' + args[1] + '"');
        if (msg.member.roles.highest.position < role.position) return msg.channel.send("You can't delete this role because it is higher than your current highest role.");
        role.delete()
            .then((done) => {
                msg.channel.send("Successfully deleted the role **" + msg.mentions.roles.first().name + "**");
            })
            .catch((error) => {
                msg.channel.send("I was unable to delete this role. Please move my role above the role you are trying to delete.");
            });
    } else if (args[1]) {
        if (!msg.member.hasPermission(["MANAGE_ROLES"])) return msg.channel.send("You must have the **Manage Roles** permission to use this command!");
        if (!msg.guild.me.hasPermission(["MANAGE_ROLES"])) return msg.channel.send("I am missing the **Manage Roles** permission and therefore can't run this command");
        var role = msg.guild.roles.cache.find((role) => role.name.toLowerCase() === args[1].toLowerCase());
        if (role === undefined || role === null) return msg.channel.send('I was unable to locate the role name "' + args[1] + '"');
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
}