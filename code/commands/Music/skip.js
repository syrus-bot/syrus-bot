const { Command } = require('klasa');

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            name: 'skip',
            enabled: true,
            runIn: ['text'],
            aliases: [],
            cooldown: 3,
            permissionLevel: 0,
            requiredPermissions: [],
            description: 'Skip track in queue',
            usage: '',
            usageDelim: undefined,
            extendedHelp: 'No extended help available.'
        });
    }

    async run(msg, [...args]) {
        msg.guild.music.skip(msg);
    }
};