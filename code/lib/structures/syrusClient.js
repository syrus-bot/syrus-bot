const { SapphireClient } = require('@sapphire/framework');
const { mergeDefault } = require('@sapphire/utilities');
const { ClientOptions } = require('discord.js');
const config = require("../../config.json");
const TaskStore = require('./taskStore');
const Enmap = require("enmap");
const fs = require("fs");

require('../extensions/guild.js');
class SyrusClient extends SapphireClient {
    constructor(options) {    
        super({ 
            ...options,
            i18n: {
                defaultMissingKey: 'missing',
                defaultNS: 'global',
                i18next: {
                    preload: ['en-us'],
                    load: 'all',
                    fallbackLng: 'en-us',
                    initImmediate: false,
                    interpolation: {
                        escapeValue: false
                    }
                }
            }
        });
        this.config = config;
        this.commands = new Enmap();
        fs.readdir("./commands/", (err, files) => {
            if (err) return console.error(err);
            files.forEach(file => {
                if (!file.endsWith(".js")) return;
                let props = require(`${process.cwd()}/commands/${file}`);
                let commandName = file.split(".")[0];
                console.log(`Attempting to load command ${commandName}`);
                this.commands.set(commandName, props);
            });
        });
    }
    fetchPrefix = () => '>';
    fetchLanguage = () => 'en-us';
}
module.exports = SyrusClient
