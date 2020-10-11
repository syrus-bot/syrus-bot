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

const { Args, Command, CommandOptions } = require("@sapphire/framework");

module.exports = class ClientCommand extends Command {
    constructor(context) {
        super(context, {
            name: "serverinfo",
            aliases: ["sinfo", "server", "si"],
            description: "the info cmd",
        });
    }

    async run(msg) {
        const get_pre = require("../../config.json");
        const args = msg.content.slice(get_pre.prefix.length).split(/ +/g);
        const Discord = require("discord.js");

        let roles = [0];
        msg.guild.roles.cache.forEach((role) => {
            if (role.name === "@everyone") return;
            roles[0] = roles[0] + 1;
        });

        console.log(msg.guild);
        msg.channel.send(
            new Discord.MessageEmbed()
                .setColor("#4287f5")
                .setTitle("About " + msg.guild.name)
                .addField("Server Owner", msg.guild.owner.user.username + "#" + msg.guild.owner.user.discriminator + "\nNick: " + msg.guild.owner.displayName, true)
                .addField("Boost Status", "<:boost:763412360433369168> Level " + msg.guild.premiumTier + "\n(" + msg.guild.premiumSubscriptionCount + " boosts)", true)
                .addField(
                    "Members",
                    msg.guild.memberCount + " total\n" + msg.guild.members.cache.filter((member) => member.user.bot).size + " bot(s)\n" + msg.guild.members.cache.filter((member) => !member.user.bot).size + " human(s)",
                    true
                )
                .addField(
                    "Stats",
                    "<:textchannel:763412308780908555> " +
                        msg.guild.channels.cache.filter((c) => c.type === "text").size +
                        " text channel(s)\n" +
                        "<:voicechannel:763412288668827728> " +
                        msg.guild.channels.cache.filter((c) => c.type === "voice").size +
                        " voice channel(s)\n" +
                        "<:emoji:763412234218766337> " +
                        msg.guild.emojis.cache.size +
                        " server emoji(s)\n" +
                        "<:members:763412258235482153> " +
                        msg.guild.roles.cache.size +
                        " server role(s)",
                    true
                )
                .addField(
                    "Settings",
                    "<:greencheck:741524095547736064> Verification level: " +
                        msg.guild.verificationLevel.toLowerCase() +
                        "\n<:greencheck:741524095547736064> Explicit filter: " +
                        msg.guild.explicitContentFilter.toLowerCase() +
                        "\n<:greencheck:741524095547736064> Server region: " +
                        msg.guild.region +
                        "\n<:greencheck:741524095547736064> 2-factor auth level: " +
                        msg.guild.mfaLevel,
                    true
                )
                .setThumbnail("https://cdn.discordapp.com/icons/" + msg.guild.id + "/" + msg.guild.icon + ".png?size=256")
                .setFooter("\nGuild ID: " + msg.guild.id + " | Guild Owner ID: " + msg.guild.owner.id)
        );
    }
};
