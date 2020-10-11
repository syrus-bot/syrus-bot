const { Args, Command, CommandOptions } = require("@sapphire/framework");

module.exports = class ClientCommand extends Command {
    constructor(context) {
        super(context, {
            name: "info",
            aliases: ["i", "lookup"],
            description: "the info cmd",
        });
    }

    async run(msg) {
        const got = require("got");
        const get_pre = require("../../config.json");
        const args = msg.content.slice(get_pre.prefix.length).split(/ +/g);
        const Discord = require("discord.js");
        if (msg.mentions.members.first()) {
            var date = new Date(msg.mentions.members.first().user.createdAt);
            const uInfoRaw = await got(`http://144.172.83.245:2468/user?id=${msg.mentions.members.first().id}`);
            const uInfo = JSON.parse(uInfoRaw.body);
            let roles = [""];
            msg.mentions.members.first().roles.cache.forEach((role) => {
                if (role.name === "@everyone") return;
                roles[0] = roles[0] + " <@&" + role.id + ">";
            });
            msg.channel.send(
                new Discord.MessageEmbed()
                    .setColor("#4287f5")
                    .setAuthor(
                        `${msg.mentions.members.first().user.username + "#" + msg.mentions.members.first().user.discriminator}`,
                        `https://cdn.discordapp.com/avatars/${msg.mentions.members.first().id}/${msg.mentions.members.first().user.avatar}.png`
                    )
                    .addField("Account Age", date.getMonth().toString() + "/" + date.getDay().toString() + "/" + date.getFullYear().toString(), true)
                    .addField(
                        "User Badges",
                        `${
                            uInfo.flags
                                .replace(/\,/gi, " ")
                                .replace("DISCORD_EMPLOYEE", "<:staff_badge:755961572945559612>")
                                .replace("DISCORD_PARTNER", "<:new_partner_badge:755961572773331054>")
                                .replace("HYPESQUAD", "<:hypesquad_badge:755961573268521071>")
                                .replace(/BUG_HUNTER_LEVEL_1|BUG_HUNTER_LEVEL_2/, "<:bug_hunter_badge:755961572454694914>")
                                .replace("HOUSE_BRILLIANCE", "<:brilliance_badge:755961572546838601>")
                                .replace("HOUSE_BRAVERY", "<:bravery_badge:755961573415190638>")
                                .replace("HOUSE_BALANCE", "<:balance_badge:755961572748427364>")
                                .replace("VERIFIED_BOT_DEVELOPER", "<:verified_developer_badge:755961573561991198>")
                                .replace("VERIFIED_BOT", "<:verified_bot:755969137448190103>")
                                .replace("SYSTEM", "<:system:755969660809117706>")
                                .replace("EARLY_SUPPORTER", "<:early_supporter_badge:755970816243400704>") || "None"
                        }`,
                        true
                    )
                    .addField("Nickname", msg.mentions.members.first().displayName, true)
                    .addField("Roles", roles, true)
                    .setThumbnail(`https://cdn.discordapp.com/avatars/${msg.mentions.members.first().id}/${msg.mentions.members.first().user.avatar}.png`)
                    .setFooter("User ID: " + msg.mentions.members.first().id)
            );
        } else if (Number(args[1])) {
            var person = msg.guild.members.cache.get(args[1]);
            if (person === undefined || person === null) return msg.channel.send('I was unable to find a member with the id "' + args[1] + '"');

            var date = new Date(person.user.createdAt);
            const uInfoRaw = await got(`http://144.172.83.245:2468/user?id=${person.id}`);
            const uInfo = JSON.parse(uInfoRaw.body);
            let roles = [""];
            person.roles.cache.forEach((role) => {
                if (role.name === "@everyone") return;
                roles[0] = roles[0] + " <@&" + role.id + ">";
            });
            msg.channel.send(
                new Discord.MessageEmbed()
                    .setColor("#4287f5")
                    .setAuthor(`${person.user.username + "#" + person.user.discriminator}`, `https://cdn.discordapp.com/avatars/${person.id}/${person.user.avatar}.png`)
                    .addField("Account Age", date.getMonth().toString() + "/" + date.getDay().toString() + "/" + date.getFullYear().toString(), true)
                    .addField(
                        "User Badges",
                        `${
                            uInfo.flags
                                .replace(/\,/gi, " ")
                                .replace("DISCORD_EMPLOYEE", "<:staff_badge:755961572945559612>")
                                .replace("DISCORD_PARTNER", "<:new_partner_badge:755961572773331054>")
                                .replace("HYPESQUAD", "<:hypesquad_badge:755961573268521071>")
                                .replace(/BUG_HUNTER_LEVEL_1|BUG_HUNTER_LEVEL_2/, "<:bug_hunter_badge:755961572454694914>")
                                .replace("HOUSE_BRILLIANCE", "<:brilliance_badge:755961572546838601>")
                                .replace("HOUSE_BRAVERY", "<:bravery_badge:755961573415190638>")
                                .replace("HOUSE_BALANCE", "<:balance_badge:755961572748427364>")
                                .replace("VERIFIED_BOT_DEVELOPER", "<:verified_developer_badge:755961573561991198>")
                                .replace("VERIFIED_BOT", "<:verified_bot:755969137448190103>")
                                .replace("SYSTEM", "<:system:755969660809117706>")
                                .replace("EARLY_SUPPORTER", "<:early_supporter_badge:755970816243400704>") || "None"
                        }`,
                        true
                    )
                    .addField("Nickname", person.displayName, true)
                    .addField("Roles", roles, true)
                    .setThumbnail(`https://cdn.discordapp.com/avatars/${person.id}/${person.user.avatar}.png`)
                    .setFooter("User ID: " + person.id)
            );
        } else if (args[1]) {
            var person = msg.guild.members.cache.find((m) => m.displayName.toLowerCase() === args[1].toLowerCase());
            if (person === undefined) return msg.channel.send('I was unable to find a member with the username/nickname "' + args[1] + '"');

            var date = new Date(person.user.createdAt);
            const uInfoRaw = await got(`http://144.172.83.245:2468/user?id=${person.id}`);
            const uInfo = JSON.parse(uInfoRaw.body);
            let roles = [""];
            person.roles.cache.forEach((role) => {
                if (role.name === "@everyone") return;
                roles[0] = roles[0] + " <@&" + role.id + ">";
            });
            msg.channel.send(
                new Discord.MessageEmbed()
                    .setColor("#4287f5")
                    .setAuthor(`${person.user.username + "#" + person.user.discriminator}`, `https://cdn.discordapp.com/avatars/${person.id}/${person.user.avatar}.png`)
                    .addField("Account Age", date.getMonth().toString() + "/" + date.getDay().toString() + "/" + date.getFullYear().toString(), true)
                    .addField(
                        "User Badges",
                        `${
                            uInfo.flags
                                .replace(/\,/gi, " ")
                                .replace("DISCORD_EMPLOYEE", "<:staff_badge:755961572945559612>")
                                .replace("DISCORD_PARTNER", "<:new_partner_badge:755961572773331054>")
                                .replace("HYPESQUAD", "<:hypesquad_badge:755961573268521071>")
                                .replace(/BUG_HUNTER_LEVEL_1|BUG_HUNTER_LEVEL_2/, "<:bug_hunter_badge:755961572454694914>")
                                .replace("HOUSE_BRILLIANCE", "<:brilliance_badge:755961572546838601>")
                                .replace("HOUSE_BRAVERY", "<:bravery_badge:755961573415190638>")
                                .replace("HOUSE_BALANCE", "<:balance_badge:755961572748427364>")
                                .replace("VERIFIED_BOT_DEVELOPER", "<:verified_developer_badge:755961573561991198>")
                                .replace("VERIFIED_BOT", "<:verified_bot:755969137448190103>")
                                .replace("SYSTEM", "<:system:755969660809117706>")
                                .replace("EARLY_SUPPORTER", "<:early_supporter_badge:755970816243400704>") || "None"
                        }`,
                        true
                    )
                    .addField("Nickname", person.displayName, true)
                    .addField("Roles", roles, true)
                    .setThumbnail(`https://cdn.discordapp.com/avatars/${person.id}/${person.user.avatar}.png`)
                    .setFooter("User ID: " + person.id)
            );
        }
    }
};
