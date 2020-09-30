const { Command } = require('klasa');

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            name: 'join',
            enabled: true,
            runIn: ['text'],
            aliases: ['connect'],
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
        if(msg.member.voice.channelID !== null){
            msg.guild.music.join(msg.member.voice);
            return msg.send("Joined <#" + msg.member.voice.channel + ">");
        }else{
            msg.reply("Oops, you must be in a voice channel to do this!");
        }
    }

};