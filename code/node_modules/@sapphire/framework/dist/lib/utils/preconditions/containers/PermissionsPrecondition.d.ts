import { PermissionResolvable } from 'discord.js';
import type { PreconditionContext } from '../../../structures/Precondition';
import type { PreconditionContainerSingleEntry } from '../PreconditionContainerSimple';
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
export declare class PermissionsPrecondition implements PreconditionContainerSingleEntry {
    entry: string;
    context: PreconditionContext;
    /**
     * Constructs a precondition container entry.
     * @param permissions The permissions that will be required by this command.
     */
    constructor(permissions: PermissionResolvable);
}
//# sourceMappingURL=PermissionsPrecondition.d.ts.map