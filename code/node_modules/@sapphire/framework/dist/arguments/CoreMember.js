"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CoreArgument = void 0;
const discord_js_1 = require("discord.js");
const Argument_1 = require("../lib/structures/Argument");
class CoreArgument extends Argument_1.Argument {
    constructor(context) {
        super(context, { name: 'member' });
    }
    async run(argument, context) {
        const { guild } = context.message;
        if (!guild) {
            return this.error(argument, 'ArgumentMemberMissingGuild', 'The argument must be run on a guild.');
        }
        try {
            return this.ok(await guild.members.fetch(argument));
        }
        catch (error) {
            if (error instanceof discord_js_1.DiscordAPIError && error.code === discord_js_1.Constants.APIErrors.UNKNOWN_MEMBER) {
                return this.error(argument, 'ArgumentMemberUnknownMember', 'The argument did not resolve to a member.');
            }
            return this.error(argument, 'ArgumentMemberUnknownError', 'The argument found an unexpected error when retrieving a member.');
        }
    }
}
exports.CoreArgument = CoreArgument;
//# sourceMappingURL=CoreMember.js.map