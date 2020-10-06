import type { Message } from 'discord.js';
import { PreconditionErrorExtras } from '../errors/PreconditionError';
import type { UserError } from '../errors/UserError';
import { Result } from '../utils/Result';
import type { Awaited } from '../utils/Types';
import { BasePiece } from './base/BasePiece';
import type { Command } from './Command';
export declare type PreconditionResult = Awaited<Result<unknown, UserError>>;
export declare type AsyncPreconditionResult = Promise<Result<unknown, UserError>>;
export declare abstract class Precondition extends BasePiece {
    abstract run(message: Message, command: Command, context: PreconditionContext): PreconditionResult;
    ok(): PreconditionResult;
    /**
     * Constructs an [[ArgumentError]] with [[ArgumentError#type]] set to the [[IArgument<T>#name]].
     * @param message The description message for the rejection.
     */
    error(message: string, extras?: PreconditionErrorExtras): PreconditionResult;
    /**
     * Constructs an [[ArgumentError]] with a custom type.
     * @param type The identifier for the error.
     * @param message The description message for the rejection.
     */
    error(type: string, message: string, extras?: PreconditionErrorExtras): PreconditionResult;
}
export interface PreconditionContext extends Record<PropertyKey, unknown> {
}
//# sourceMappingURL=Precondition.d.ts.map