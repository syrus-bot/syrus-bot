const { Client, KlasaConsole } = require('klasa');
const config = require("../../config.json");

// Schemas
const defaultGuildSchema = require('./schemas/defaultGuildSchema');
require('../extensions/guild.js');
class SyrusClient extends Client {
     constructor(options) {
        super({ ...options, /* permissionLevels, */ defaultGuildSchema /*, defaultClientSchema, defaultUserSchema, defaultMemberSchema */ });
        this.config = config;
        this.console = new KlasaConsole();
     }
}
module.exports = SyrusClient