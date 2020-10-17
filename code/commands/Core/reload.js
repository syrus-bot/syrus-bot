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
			name: "reload",
			description: "commands:reload.description",
			preconditions: ["owner"]
		});
	}
	
	async run(message, args) {
		const cmdn = await args.pickResult("string");
		const cmdnm = cmdn.value;
		if (cmdnm === "all") {
			this.client.commands.forEach((value, key, map) => {
				delete require.cache[require.resolve(value.path)];
			});
			this.client.commands.clear();
			await this.client.commands.loadAll();
			message.sendTranslated("commands:core.reload.allreloaded");
			return;
		}
		
		const cmd = this.client.commands.get(cmdnm);
		if (cmd === undefined) {
			return message.sendTranslated("commands:core.reload.notfound", [{
				commandName: cmdn
			}]);
		}
		const cmdp = cmd.path;
		this.client.commands.delete(cmdnm);
		delete require.cache[require.resolve(cmdp)];
		const reloaded = await this.client.commands.load(cmdp);
		for await (let command of reloaded) {
			this.client.commands.insert(command);
		}
		message.sendTranslated("commands:core.reload.reloaded", [{
			commandName: cmdnm
		}]);
	};
}