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

const { Constants, DiscordAPIError, GuildMember } = require("discord.js");
const { Argument } = require("@sapphire/framework");

module.exports = class ClientArgument extends Argument {
    constructor(context) {
        super(context, {name: "parsemember"});
    }
    
    async run(argument, context) {
        const { guild } = context.message;
        if (!guild) {
            return this.error(argument, 'ArgumentMemberMissingGuild', 'The argument must be run on a guild.');
        }
        
        try {
            if (/^\d+$/.test(argument)) {
                return this.ok(await guild.members.fetch(argument));
            } else if (context.message.mentions.members.first() !== undefined ) {
                return this.ok(context.message.mentions.members.first());
            } else {
                const mem = await guild.members.fetch({query: argument, limit: 1});
                const val = mem.values().next();
                if (val.value !== undefined) {
                    return this.ok(val.value);
                } else {
                    throw new DiscordAPIError({code: Constants.APIErrors.UNKNOWN_MEMBER});
                }
            }
        } catch (error) {
            if (typeof(error) === DiscordAPIError && error.code === Constants.APIErrors.UNKNOWN_MEMBER) {
                return this.error(argument, 'ArgumentMemberUnknownMember', 'The argument did not resolve to a member.');
            }
            
            return this.error(argument, 'ArgumentMemberUnknownError', 'The argument found an unexpected error when retrieving a member.');
        }
    }
}