import { Message } from 'discord.js';
import type { Command } from '../lib/structures/Command';
import { Precondition, PreconditionContext, PreconditionResult } from '../lib/structures/Precondition';
export declare class CorePrecondition extends Precondition {
    private readonly dmChannelPermissions;
    run(message: Message, _command: Command, context: PreconditionContext): PreconditionResult;
}
//# sourceMappingURL=Permissions.d.ts.map