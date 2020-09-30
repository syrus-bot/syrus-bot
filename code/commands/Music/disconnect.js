const { Command } = require('klasa');

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            name: 'disconnect',
            enabled: true,
            runIn: ['text'],
            aliases: [],
            cooldown: 3,
            permissionLevel: 0,
            requiredPermissions: [],
            description: 'Join a users voice channel',
            usage: '',
            usageDelim: undefined,
            extendedHelp: 'No extended help available.'
        });
    }

    async run(msg, [...args]) {
        msg.guild.music.disconnect(msg.guild);
        // if(msg.member.voice.channelID !== null){
        // }else{
            // msg.reply("Oops, you must be in a voice channel to do this!");
        // }
    }

};