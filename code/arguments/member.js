const { Constants, DiscordAPIError, GuildMember } = require("discord.js");
const { Argument } = require("@sapphire/framework");

module.exports = class ClientArgument extends Argument {
    constructor(context) {
        super(context, {name: "parsemember"});
    }
    
    async run(argument, context) {
        const { guild } = context.message;
        if (!guild) {
            return this.error(argument, 'ArgumentMemberMissingGuild', 'The argument must be run on a guild.');
        }
        
        try {
            if (/^\d+$/.test(argument)) {
                return this.ok(await guild.members.fetch(argument));
            } else if (context.message.mentions.members.first() !== undefined ) {
                return this.ok(context.message.mentions.members.first());
            } else {
                const mem = await guild.members.fetch({query: argument, limit: 1});
                if (mem.values().hasNext()) {
                    return this.ok(mem.values().next().value);
                } else {
                    throw new DiscordAPIError({code: Constants.APIErrors.UNKNOWN_MEMBER});
                }
            }
        } catch (error) {
            if (typeof(error) === DiscordAPIError && error.code === Constants.APIErrors.UNKNOWN_MEMBER) {
                return this.error(argument, 'ArgumentMemberUnknownMember', 'The argument did not resolve to a member.');
            }
            
            return this.error(argument, 'ArgumentMemberUnknownError', 'The argument found an unexpected error when retrieving a member.');
        }
    }
}