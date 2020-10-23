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

const { Command } = require("@sapphire/framework");
const path = require("path");

module.exports = class SyrusCommand extends Command {
	constructor(context, {name, ...options}) {
		super(
			context,
			{
				...options,
				name: (name ?? context.name).toLowerCase()
			}
		);
		const folder = path.dirname(
			this.path.replace(/\\/g, "/")
		).split("/");
		this.category = folder[folder.length - 1];
	}
}