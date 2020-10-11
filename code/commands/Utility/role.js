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
            name: "role",
            aliases: ["r", "ro"],
            description: "give or remove a role from someone"
        });
    }
    
    async run(msg) {
        const get_pre = require('../../config.json');
        const args = msg.content.slice(get_pre.prefix.length).split(/ +/g);

    const Discord = require("discord.js");
    if (msg.mentions.members.first()) {
        if (!msg.member.hasPermission(["MANAGE_ROLES"])) return msg.channel.send("You must have the **Manage Roles** permission to use this command!");
        if (!msg.guild.me.hasPermission(["MANAGE_ROLES"])) return msg.channel.send("I am missing the **Manage Roles** permission and therefore can't run this command");

        if (msg.mentions.roles.first()) {
            if (msg.member.roles.highest.position < msg.mentions.roles.first().position) return msg.channel.send("You can't apply this role because it is higher than your current highest role.");
            if (msg.mentions.members.first().roles.cache.has(msg.mentions.roles.first().id)) {
                msg.mentions.members
                    .first()
                    .roles.remove(msg.mentions.roles.first().id)
                    .then((ok) => {
                        msg.channel.send("Removed the role **" + msg.mentions.roles.first().name + "** from **" + msg.mentions.members.first().user.username + "#" + msg.mentions.members.first().user.discriminator + "**");
                    })
                    .catch((error) => {
                        msg.channel.send("That role is higher than my current role. Please move my role up to remove this role.");
                    });
            } else {
                msg.mentions.members
                    .first()
                    .roles.add(msg.mentions.roles.first().id)
                    .then((ok) => {
                        msg.channel.send("Gave the role **" + msg.mentions.roles.first().name + "** to **" + msg.mentions.members.first().user.username + "#" + msg.mentions.members.first().user.discriminator + "**");
                    })
                    .catch((error) => {
                        msg.channel.send("That role is higher than my current role. Please move my role up to grant this role.");
                    });
            }
        } else if (Number(args[2])) {
            var role = msg.guild.roles.cache.get(args[2]);
            if (role) {
                if (msg.member.roles.highest.position < role.position) return msg.channel.send("You can't apply this role because it is higher than your current highest role.");
                if (msg.mentions.members.first().roles.cache.has(role.id)) {
                    msg.mentions.members
                        .first()
                        .roles.remove(role.id)
                        .then((ok) => {
                            msg.channel.send("Removed the role **" + role.name + "** from **" + msg.mentions.members.first().user.username + "#" + msg.mentions.members.first().user.discriminator + "**");
                        })
                        .catch((error) => {
                            msg.channel.send("That role is higher than my current role. Please move my role up to remove this role.");
                        });
                } else {
                    msg.mentions.members
                        .first()
                        .roles.add(role.id)
                        .then((ok) => {
                            msg.channel.send("Gave the role **" + role.name + "** to **" + msg.mentions.members.first().user.username + "#" + msg.mentions.members.first().user.discriminator + "**");
                        })
                        .catch((error) => {
                            msg.channel.send("That role is higher than my current role. Please move my role up to grant this role.");
                        });
                }
            } else {
                msg.channel.send('I could not locate the role id "' + args[2] + '"');
            }
        } else if (args[2]) {
            var role = msg.guild.roles.cache.find((role) => role.name.toLowerCase() === args[2].toLowerCase());
            if (role) {
                if (msg.member.roles.highest.position < role.position) return msg.channel.send("You can't apply this role because it is higher than your current highest role.");
                if (msg.mentions.members.first().roles.cache.has(role.id)) {
                    msg.mentions.members
                        .first()
                        .roles.remove(role.id)
                        .then((ok) => {
                            msg.channel.send("Removed the role **" + role.name + "** from **" + msg.mentions.members.first().user.username + "#" + msg.mentions.members.first().user.discriminator + "**");
                        })
                        .catch((error) => {
                            msg.channel.send("That role is higher than my current role. Please move my role up to remove this role.");
                        });
                } else {
                    msg.mentions.members
                        .first()
                        .roles.add(role.id)
                        .then((ok) => {
                            msg.channel.send("Gave the role **" + role.name + "** to **" + msg.mentions.members.first().user.username + "#" + msg.mentions.members.first().user.discriminator + "**");
                        })
                        .catch((error) => {
                            msg.channel.send("That role is higher than my current role. Please move my role up to grant this role.");
                        });
                }
            } else {
                msg.channel.send('I could not locate the role name "' + args[2] + '"');
            }
        } else {
            msg.channel.send("You need to specify a role to give to this user!");
        }
    } else if (Number(args[1])) {
        if (!msg.member.hasPermission(["MANAGE_ROLES"])) return msg.channel.send("You must have the **Manage Roles** permission to use this command!");
        if (!msg.guild.me.hasPermission(["MANAGE_ROLES"])) return msg.channel.send("I am missing the **Manage Roles** permission and therefore can't run this command");

        var person = msg.guild.members.cache.get(args[1]);
        if (person === undefined || person === null) return msg.channel.send('I was unable to find a member with the id "' + args[1] + '"');

        if (!msg.member.hasPermission(["MANAGE_ROLES"])) return msg.channel.send("You must have the **Manage Roles** permission to use this command!");
        if (!msg.guild.me.hasPermission(["MANAGE_ROLES"])) return msg.channel.send("I am missing the **Manage Roles** permission and therefore can't run this command");

        if (msg.mentions.roles.first()) {
            if (msg.member.roles.highest.position < msg.mentions.roles.first().position) return msg.channel.send("You can't apply this role because it is higher than your current highest role.");
            if (person.roles.cache.has(msg.mentions.roles.first().id)) {
                person.roles
                    .remove(msg.mentions.roles.first().id)
                    .then((ok) => {
                        msg.channel.send("Removed the role **" + msg.mentions.roles.first().name + "** from **" + person.user.username + "#" + person.user.discriminator + "**");
                    })
                    .catch((error) => {
                        msg.channel.send("That role is higher than my current role. Please move my role up to remove this role.");
                    });
            } else {
                person.roles
                    .add(msg.mentions.roles.first().id)
                    .then((ok) => {
                        msg.channel.send("Gave the role **" + msg.mentions.roles.first().name + "** to **" + person.user.username + "#" + person.user.discriminator + "**");
                    })
                    .catch((error) => {
                        msg.channel.send("That role is higher than my current role. Please move my role up to grant this role.");
                    });
            }
        } else if (Number(args[2])) {
            var role = msg.guild.roles.cache.get(args[2]);
            if (role) {
                if (msg.member.roles.highest.position < role.position) return msg.channel.send("You can't apply this role because it is higher than your current highest role.");
                if (person.roles.cache.has(role.id)) {
                    person.roles
                        .remove(role.id)
                        .then((ok) => {
                            msg.channel.send("Removed the role **" + role.name + "** from **" + person.user.username + "#" + person.user.discriminator + "**");
                        })
                        .catch((error) => {
                            msg.channel.send("That role is higher than my current role. Please move my role up to remove this role.");
                        });
                } else {
                    person.roles
                        .add(role.id)
                        .then((ok) => {
                            msg.channel.send("Gave the role **" + role.name + "** to **" + person.user.username + "#" + person.user.discriminator + "**");
                        })
                        .catch((error) => {
                            msg.channel.send("That role is higher than my current role. Please move my role up to grant this role.");
                        });
                }
            } else {
                msg.channel.send('I could not locate the role id "' + args[2] + '"');
            }
        } else if (args[2]) {
            var role = msg.guild.roles.cache.find((role) => role.name.toLowerCase() === args[2].toLowerCase());
            if (role) {
                if (msg.member.roles.highest.position < role.position) return msg.channel.send("You can't apply this role because it is higher than your current highest role.");
                if (person.roles.cache.has(role.id)) {
                    person.roles
                        .remove(role.id)
                        .then((ok) => {
                            msg.channel.send("Removed the role **" + role.name + "** from **" + person.user.username + "#" + person.user.discriminator + "**");
                        })
                        .catch((error) => {
                            msg.channel.send("That role is higher than my current role. Please move my role up to remove this role.");
                        });
                } else {
                    person.roles
                        .add(role.id)
                        .then((ok) => {
                            msg.channel.send("Gave the role **" + role.name + "** to **" + person.user.username + "#" + person.user.discriminator + "**");
                        })
                        .catch((error) => {
                            msg.channel.send("That role is higher than my current role. Please move my role up to grant this role.");
                        });
                }
            } else {
                msg.channel.send('I could not locate the role name "' + args[2] + '"');
            }
        } else {
            msg.channel.send("You need to specify a role to give to this user!");
        }
    } else if (args[1]) {
        if (!msg.member.hasPermission(["MANAGE_ROLES"])) return msg.channel.send("You must have the **Manage Roles** permission to use this command!");
        if (!msg.guild.me.hasPermission(["MANAGE_ROLES"])) return msg.channel.send("I am missing the **Manage Roles** permission and therefore can't run this command");

        var person = msg.guild.members.cache.find((m) => m.displayName === args[1]);
        if (person === undefined) return msg.channel.send('I was unable to find a member with the username/nickname "' + args[1] + '"');

        if (!msg.member.hasPermission(["MANAGE_ROLES"])) return msg.channel.send("You must have the **Manage Roles** permission to use this command!");
        if (!msg.guild.me.hasPermission(["MANAGE_ROLES"])) return msg.channel.send("I am missing the **Manage Roles** permission and therefore can't run this command");

        if (msg.mentions.roles.first()) {
            if (msg.member.roles.highest.position < msg.mentions.roles.first().position) return msg.channel.send("You can't apply this role because it is higher than your current highest role.");
            if (person.roles.cache.has(msg.mentions.roles.first().id)) {
                person.roles
                    .remove(msg.mentions.roles.first().id)
                    .then((ok) => {
                        msg.channel.send("Removed the role **" + msg.mentions.roles.first().name + "** from **" + person.user.username + "#" + person.user.discriminator + "**");
                    })
                    .catch((error) => {
                        msg.channel.send("That role is higher than my current role. Please move my role up to remove this role.");
                    });
            } else {
                person.roles
                    .add(msg.mentions.roles.first().id)
                    .then((ok) => {
                        msg.channel.send("Gave the role **" + msg.mentions.roles.first().name + "** to **" + person.user.username + "#" + person.user.discriminator + "**");
                    })
                    .catch((error) => {
                        msg.channel.send("That role is higher than my current role. Please move my role up to grant this role.");
                    });
            }
        } else if (Number(args[2])) {
            var role = msg.guild.roles.cache.get(args[2]);
            if (role) {
                if (msg.member.roles.highest.position < role.position) return msg.channel.send("You can't apply this role because it is higher than your current highest role.");
                if (person.roles.cache.has(role.id)) {
                    person.roles
                        .remove(role.id)
                        .then((ok) => {
                            msg.channel.send("Removed the role **" + role.name + "** from **" + person.user.username + "#" + person.user.discriminator + "**");
                        })
                        .catch((error) => {
                            msg.channel.send("That role is higher than my current role. Please move my role up to remove this role.");
                        });
                } else {
                    person.roles
                        .add(role.id)
                        .then((ok) => {
                            msg.channel.send("Gave the role **" + role.name + "** to **" + person.user.username + "#" + person.user.discriminator + "**");
                        })
                        .catch((error) => {
                            msg.channel.send("That role is higher than my current role. Please move my role up to grant this role.");
                        });
                }
            } else {
                msg.channel.send('I could not locate the role id "' + args[2] + '"');
            }
        } else if (args[2]) {
            var role = msg.guild.roles.cache.find((role) => role.name.toLowerCase() === args[2].toLowerCase());
            if (role) {
                if (msg.member.roles.highest.position < role.position) return msg.channel.send("You can't apply this role because it is higher than your current highest role.");
                if (person.roles.cache.has(role.id)) {
                    person.roles
                        .remove(role.id)
                        .then((ok) => {
                            msg.channel.send("Removed the role **" + role.name + "** from **" + person.user.username + "#" + person.user.discriminator + "**");
                        })
                        .catch((error) => {
                            msg.channel.send("That role is higher than my current role. Please move my role up to remove this role.");
                        });
                } else {
                    person.roles
                        .add(role.id)
                        .then((ok) => {
                            msg.channel.send("Gave the role **" + role.name + "** to **" + person.user.username + "#" + person.user.discriminator + "**");
                        })
                        .catch((error) => {
                            msg.channel.send("That role is higher than my current role. Please move my role up to grant this role.");
                        });
                }
            } else {
                msg.channel.send('I could not locate the role name "' + args[2] + '"');
            }
        } else {
            msg.channel.send("You need to specify a role to give to this user!");
        }
    } else {
        msg.channel.send("You need to specify a user for this command to work!");
    }
};
}