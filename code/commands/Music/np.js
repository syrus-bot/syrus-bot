const { Command } = require('klasa');

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            name: 'np',
            enabled: true,
            runIn: ['text'],
            aliases: ['now', 'n', 'song', 'track'],
            cooldown: 3,
            permissionLevel: 0,
            requiredPermissions: [],
            description: 'Now playing.',
            usage: '',
            usageDelim: undefined,
            extendedHelp: 'Shows information about the song currently being played.'
        });
    }

    async run(msg, [...args]) {
        msg.guild.music.nowPlaying(msg);
    }
};