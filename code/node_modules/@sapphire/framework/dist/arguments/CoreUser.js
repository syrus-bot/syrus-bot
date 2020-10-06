"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CoreArgument = void 0;
const discord_js_1 = require("discord.js");
const Argument_1 = require("../lib/structures/Argument");
class CoreArgument extends Argument_1.Argument {
    constructor(context) {
        super(context, { name: 'user' });
    }
    async run(argument) {
        try {
            return this.ok(await this.client.users.fetch(argument));
        }
        catch (error) {
            if (error instanceof discord_js_1.DiscordAPIError && error.code === discord_js_1.Constants.APIErrors.UNKNOWN_USER) {
                return this.error(argument, 'ArgumentUserUnknownUser', 'The argument did not resolve to a user.');
            }
            return this.error(argument, 'ArgumentUserUnknownError', 'The argument found an unexpected error when retrieving a user.');
        }
    }
}
exports.CoreArgument = CoreArgument;
//# sourceMappingURL=CoreUser.js.map