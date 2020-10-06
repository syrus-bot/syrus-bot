import type { Message } from 'discord.js';
import type { UserError } from '../../errors/UserError';
import type { Command } from '../../structures/Command';
import { Result } from '../Result';
import { PreconditionContainerAny } from './PreconditionContainerAny';
export declare class PreconditionContainerAll extends PreconditionContainerAny {
    protected runSequential(message: Message, command: Command): Promise<Result<unknown, UserError>>;
    protected runParallel(message: Message, command: Command): Promise<Result<unknown, UserError>>;
}
//# sourceMappingURL=PreconditionContainer.d.ts.map