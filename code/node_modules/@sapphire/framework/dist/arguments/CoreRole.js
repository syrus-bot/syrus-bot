"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CoreArgument = void 0;
const Argument_1 = require("../lib/structures/Argument");
class CoreArgument extends Argument_1.Argument {
    constructor(context) {
        super(context, { name: 'role' });
    }
    run(argument, context) {
        const { guild } = context.message;
        if (!guild) {
            return this.error(argument, 'ArgumentRoleMissingGuild', 'The argument must be run on a guild.');
        }
        const role = guild.roles.cache.get(argument);
        if (!role) {
            return this.error(argument, 'ArgumentRoleMissingRole', 'The argument did not resolve to a role.');
        }
        return this.ok(role);
    }
}
exports.CoreArgument = CoreArgument;
//# sourceMappingURL=CoreRole.js.map