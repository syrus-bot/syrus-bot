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
            name: "sus",
            description: "commands:sus.description"
        });
    }
    
    async run(message, args) {
        const member = await args.pickResult("parsemember");
        const impostor = {
            0: {
                was: "wasn't",
                rem: "1 impostor remains"
            },
            1: {
                was: "was",
                rem: "0 impostors remain"
            }
        }[Math.floor(Math.random() * 2)];
        let disp; 
        if (member.success) {
            disp = member.value.displayName;
        } else { 
            disp = message.author.username;
        }
        message.channel.send(
            `
            .      　。　　　　•　    　ﾟ　　。
            　　.　　　.　　　  　　.　　　　　。　　   。　.
             　.　　      。　        ඞ   。　    .    •
             •                **${disp} ${impostor.was} The Impostor.**　 。　.
                                  ${impostor.rem}
            　 　　。　　　　　　ﾟ　　　.　　　　　.
            ,　　　　.　 .　　       .               。
            `
        );
    }
}