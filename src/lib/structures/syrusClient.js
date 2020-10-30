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

const {
	SapphireClient,
	EventStore
} = require("@sapphire/framework");
const CommandStore = require("./CommandStore");
const { ClientOptions } = require("discord.js");
const DB = require("../../providers/mongodb.js")
const { i18next } = require("i18next");
const in17n = require("@scp/in17n/register");

require("../extensions/guild.js");
class SyrusClient extends SapphireClient {
	constructor(options) {
		super({
			...options,
			i18n: {
				defaultMissingKey: "missing",
				defaultNS: "global",
				i18next: {
					preload: ["en-us"],
					load: "all",
					fallbackLng: "en-us",
					initImmediate: false,
					interpolation: {
						escapeValue: false
					}
				}
			}
		});
		this.commands = new CommandStore(this).registerPath(`${process.cwd()}/commands/`);
		this.events = new EventStore(this).registerPath(`${process.cwd()}/events/`);
		this.settings = new DB();
		this.registerStore(this.commands);
		this.registerStore(this.events);
		this.preconditions.registerPath(`${process.cwd()}/preconditions/`);
		this.arguments.registerPath(`${process.cwd()}/arguments/`);
	}

	fetchPrefix = async (message) => {
		const guild = await this.settings.guild(message.guild.id);
		if (guild.prefix !== undefined) {
			return guild.prefix;
		}
		const global = await this.settings.global();
		return global.prefix;
	};

	fetchLanguage = async (message) => {
		const guild = await this.settings.guild(message.guild.id);
		if (guild.language !== undefined) {
			return guild.language;
		}
		const global = await this.settings.global();
		return global.language;
	};
}
module.exports = SyrusClient
