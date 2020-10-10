const { SapphireClient, CommandStore, EventStore } = require('@sapphire/framework');
const { mergeDefault } = require('@sapphire/utilities');
const { ClientOptions } = require('discord.js');
const db = require("../../providers/mongodb.js")
const { i18next } = require("i18next");
const in17n = require("@scp/in17n/register");

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
        this.settings = new db();
        this.registerStore(this.commands);
        this.registerStore(this.events);
        this.preconditions.registerPath(`${process.cwd()}/preconditions/`);
    }
    fetchPrefix = async (message) => {
        const guild = await this.settings.guild(message.guild.id);
        const global = await this.settings.global();
        if (guild !== null) {
            if (guild.prefix !== undefined) {
                return guild.prefix;
            }
        }
        return global.prefix;
    };
    fetchLanguage = () => 'en-us';
}
module.exports = SyrusClient
