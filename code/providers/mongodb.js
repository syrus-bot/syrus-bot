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

const mongoose = require('mongoose');
const { MongoError, DocumentNotFoundError } = require('mongodb');
const config = require('../config.json');

moduleSchema = new mongoose.Schema({
    enabled: {type: Boolean, default: true},
    disabledCommands: [String],
    settings: {}
});

guildSchema = new mongoose.Schema({
    _id: Number,
    prefix: String,
    language: String,
    modules: {
        core: {type: moduleSchema},
        music: {type: moduleSchema},
        moderation: {type: moduleSchema},
        automod: {type: moduleSchema},
        utility: {type: moduleSchema},
        api: {type: moduleSchema},
        fun: {type: moduleSchema},
        info: {type: moduleSchema}
    }
});

module.exports = class {
    constructor(...args) {
        const connection = {
            host: config.database.host,
            port: config.database.port,
            data: config.database.base,
            user: config.database.user,
            pass: config.database.pass,
            options: {
                useNewUrlParser: true,
                useUnifiedTopology: true
            }
        };
        this.db = mongoose.createConnection(
            `mongodb://${connection.user}:${connection.pass}@${connection.host}:${connection.port}/${connection.data}`, 
            connection.options
        );
        this.db.startSession();
        this.db.on('connected', () => {console.log('Database connected!');});
        this.guildschema = this.db.model('Guild', guildSchema);
    }
    
    global() {
        this.db.createCollection("global").catch((err) => {});
        this.db.collection("global").insertOne({_id: 0, prefix: config.prefix, token: config.token}).catch((err) => {});
        return this.db.collection("global").findOne({_id: 0});
    }
    
    guild(id) {
        return this.guildschema.findById(Number(id), async (err, guild) => {
            if (guild === null) {
                const doc = new this.guildschema({_id: Number(id)});
                await doc.save();
                const guild = doc;
            }
            return guild;
        });
    }
}