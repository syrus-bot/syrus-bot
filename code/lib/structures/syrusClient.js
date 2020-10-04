const { SapphireClient } = require('@sapphire/framework');
const { mergeDefault } = require('@sapphire/utilities');
const { ClientOptions } = require('discord.js');
const config = require("../../config.json");
const TaskStore = require('./taskStore')

require('../extensions/guild.js');
class SyrusClient extends SapphireClient {
    tasks = new TaskStore(this);
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
        this.registerStore(this.tasks).registerUserDirectories();
    }
    fetchPrefix = () => '>';
    fetchLanguage = () => 'en-us';
}
module.exports = SyrusClient
