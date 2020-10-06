const { SapphireClient, CommandStore, EventStore } = require('@sapphire/framework');
const { mergeDefault } = require('@sapphire/utilities');
const { ClientOptions } = require('discord.js');
const config = require("../../config.json");

require('../extensions/guild.js');
class SyrusClient extends SapphireClient {
    commands = new CommandStore(this).registerPath(`${process.cwd()}/commands/`);
    events = new EventStore(this).registerPath(`${process.cwd()}/events/`);
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
        this.registerStore(this.commands);
        this.registerStore(this.events);
    }
    fetchPrefix = () => '>';
    fetchLanguage = () => 'en-us';
}
module.exports = SyrusClient
