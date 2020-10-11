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
            name: "pp",
            description: "peepee size thing"
        });
    }
    
    async run(msg) {
        const get_pre = require('../../config.json');
        const args = msg.content.slice(get_pre.prefix.length).split(/ +/g);
    const Discord = require("discord.js");
    const sizes = ["8D", "8=D", "8==D", "8===D", "8====D", "8=====D", "8======D", "8=======D", "8========D"];
    const size = Math.floor(Math.random() * sizes.length);
    if (msg.mentions.members.first()) {
        msg.channel.send(
            new Discord.MessageEmbed()
                .setColor("#34eb7d")
                .setTitle(msg.mentions.members.first().user.username + "'s PeePee")
                .setDescription("**" + sizes[size] + "**")
        );
    } else {
        msg.channel.send(
            new Discord.MessageEmbed()
                .setColor("#34eb7d")
                .setTitle(msg.author.username + "'s PeePee")
                .setDescription("**" + sizes[size] + "**")
        );
    }
};

}