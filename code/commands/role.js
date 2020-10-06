exports.run = (client, msg, args) => {
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
        } else if (Number(args[1])) {
            var role = msg.guild.roles.cache.get(args[1]);
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
                msg.channel.send('I could not locate the role id "' + args[1] + '"');
            }
        } else if (args[1]) {
            var role = msg.guild.roles.cache.find((role) => role.name.toLowerCase() === args[1].toLowerCase());
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
                msg.channel.send('I could not locate the role name "' + args[1] + '"');
            }
        } else {
            msg.channel.send("You need to specify a role to give to this user!");
        }
    } else if (Number(args[0])) {
        if (!msg.member.hasPermission(["MANAGE_ROLES"])) return msg.channel.send("You must have the **Manage Roles** permission to use this command!");
        if (!msg.guild.me.hasPermission(["MANAGE_ROLES"])) return msg.channel.send("I am missing the **Manage Roles** permission and therefore can't run this command");

        var person = msg.guild.members.cache.get(args[0]);
        if (person === undefined || person === null) return msg.channel.send('I was unable to find a member with the id "' + args[0] + '"');

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
        } else if (Number(args[1])) {
            var role = msg.guild.roles.cache.get(args[1]);
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
                msg.channel.send('I could not locate the role id "' + args[1] + '"');
            }
        } else if (args[1]) {
            var role = msg.guild.roles.cache.find((role) => role.name.toLowerCase() === args[1].toLowerCase());
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
                msg.channel.send('I could not locate the role name "' + args[1] + '"');
            }
        } else {
            msg.channel.send("You need to specify a role to give to this user!");
        }
    } else if (args[0]) {
        if (!msg.member.hasPermission(["MANAGE_ROLES"])) return msg.channel.send("You must have the **Manage Roles** permission to use this command!");
        if (!msg.guild.me.hasPermission(["MANAGE_ROLES"])) return msg.channel.send("I am missing the **Manage Roles** permission and therefore can't run this command");

        var person = msg.guild.members.cache.find((m) => m.displayName === args[0]);
        if (person === undefined) return msg.channel.send('I was unable to find a member with the username/nickname "' + args[0] + '"');

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
        } else if (Number(args[1])) {
            var role = msg.guild.roles.cache.get(args[1]);
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
                msg.channel.send('I could not locate the role id "' + args[1] + '"');
            }
        } else if (args[1]) {
            var role = msg.guild.roles.cache.find((role) => role.name.toLowerCase() === args[1].toLowerCase());
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
                msg.channel.send('I could not locate the role name "' + args[1] + '"');
            }
        } else {
            msg.channel.send("You need to specify a role to give to this user!");
        }
    } else {
        msg.channel.send("You need to specify a user for this command to work!");
    }
};
