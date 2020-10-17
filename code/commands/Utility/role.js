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
const { Permissions } = require("discord.js");

module.exports = class ClientCommand extends Command {
    constructor(context) {
        super(context, {
            name: "role",
            aliases: ["r", "ro"],
            description: "commands:utilities.role.description",
            preconditions: ["GuildOnly", {entry: "permissions", context: {
                permissions: new Permissions(Permissions.FLAGS.MANAGE_ROLES)
            }}]
        });
    }
    
    async run(message, args) {
        const member = await args.pickResult("parsemember");
        if (!member.success) {
            return message.sendTranslated("global:notfound", [{type: "member"}]);
        }
        const role = await args.pickResult("parserole");
        if (!role.success) {
            return message.sendTranslated("global:notfound", [{type: "role"}]);
        }
        const m = member.value;
        const r = role.value;
        if (!r.editable || m.roles.highest.position <= r.position) {
            return message.sendTranslated("global:highererr", [{
                func: "delete", 
                type: "role"
            }]);
        }
        if (m.roles.cache.has(r.id)) {
            m.roles.remove(r.id).then((ok) => {
                message.sendTranslated("commands:utilities.role.removed", [{
                    role: r.name,
                    user: `${m.user.username}#${m.user.discriminator}`
                }]);
            });
        } else {
            m.roles.add(r.id).then((ok) => {
                message.sendTranslated("commands:utilities.role.added", [{
                    role: r.name,
                    user: `${m.user.username}#${m.user.discriminator}`
                }]);
            });
        }
    };
}