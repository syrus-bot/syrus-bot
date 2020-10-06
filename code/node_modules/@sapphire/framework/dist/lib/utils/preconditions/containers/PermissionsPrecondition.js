"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PermissionsPrecondition = void 0;
const discord_js_1 = require("discord.js");
/**
 * Constructs a contextful permissions precondition requirement.
 * @example
 * ```typescript
 * export class CoreCommand extends Command {
 *   public constructor(context: PieceContext) {
 *     super(context, {
 *       preconditions: [
 *         'GuildOnly',
 *         new PermissionsPrecondition('ADD_REACTIONS')
 *       ]
 *     });
 *   }
 *
 *   public run(message: Message, args: Args) {
 *     // ...
 *   }
 * }
 * ```
 */
class PermissionsPrecondition {
    /**
     * Constructs a precondition container entry.
     * @param permissions The permissions that will be required by this command.
     */
    constructor(permissions) {
        this.entry = 'Permissions';
        this.context = {
            permissions: new discord_js_1.Permissions(permissions)
        };
    }
}
exports.PermissionsPrecondition = PermissionsPrecondition;
//# sourceMappingURL=PermissionsPrecondition.js.map