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

const { SapphireClient } = require("@sapphire/framework");
const CommandStore = require("./CommandStore");
const { ClientOptions } = require("discord.js");
const DB = require("../../providers/mongodb.js")
const { i18next } = require("i18next");
const in17n = require("@scp/in17n/register");

async function fetchPrefix(message) {
	const guild = await this.settings.guild(message.guild.id);
	if (guild.prefix !== undefined) {
		return guild.prefix;
	}
	const global = await this.settings.global();
	return global.prefix;
}

async function fetchLanguage(message) {
	const guild = await this.settings.guild(message.guild.id);
	if (guild.language !== undefined) {
		return guild.language;
	}
	const global = await this.settings.global();
	return global.language;
}

class SyrusClient extends SapphireClient {
	constructor(options) {
		super({
			...options,
			i18n: {
				defaultMissingKey: "missing",
				defaultNS: "global",
				i18next: {
					preload: ["en-us"],
					load: "currentOnly",
					lowerCaseLng: true,
					fallbackLng: "en-us",
					initImmediate: false,
					interpolation: {
						escapeValue: false
					}
				}
			}
		});
		this.commands = new CommandStore(this)
			.registerPath(`${process.cwd()}/commands/`);
		this.music = null;
		this.registerStore(this.commands);
		this.settings = new DB();

		this.fetchPrefix = fetchPrefix.bind(this);
		this.fetchLanguage = fetchLanguage.bind(this);
	}
}
module.exports = SyrusClient
