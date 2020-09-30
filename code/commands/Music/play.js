const { Command } = require('klasa');

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            name: 'play',
            enabled: true,
            runIn: ['text'],
            aliases: [],
            cooldown: 3,
            permissionLevel: 0,
            requiredPermissions: [],
            description: 'Play a song. (Adds to queue if already playing)',
            usage: '<song:string>',
            usageDelim: undefined,
            extendedHelp: 'No extended help available.'
        });
    }

    async run(msg, [...args]) {
        if(msg.member.voice.channelID == null){
            return msg.reply("Oops, you must be in a voice channel to do this");
        }else {
            let cVoice = msg.guild.members.get(this.client.user.id);
            if (cVoice.voice.channelID == null){
                return msg.reply("Oops, you must invite me to a voice channel first!");
            }else {
                msg.guild.music.queueSong(msg, args[0]);
            }
        }
    }

};