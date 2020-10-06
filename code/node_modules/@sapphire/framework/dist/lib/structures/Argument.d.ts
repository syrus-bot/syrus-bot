import type { Message } from 'discord.js';
import type { UserError } from '../errors/UserError';
import { Result } from '../utils/Result';
import type { Awaited } from '../utils/Types';
import { BaseAliasPiece } from './base/BaseAliasPiece';
import type { Command } from './Command';
export declare type ArgumentResult<T> = Awaited<Result<T, UserError>>;
export declare type AsyncArgumentResult<T> = Promise<Result<T, UserError>>;
export interface IArgument<T> {
    readonly name: string;
    run(argument: string, context: ArgumentContext): ArgumentResult<T>;
}
export declare abstract class Argument<T = unknown> extends BaseAliasPiece implements IArgument<T> {
    abstract run(argument: string, context: ArgumentContext): ArgumentResult<T>;
    ok(value: T): ArgumentResult<T>;
    /**
     * Constructs an [[ArgumentError]] with [[ArgumentError#type]] set to the [[IArgument<T>#name]].
     * @param parameter The parameter that triggered the argument.
     * @param message The description message for the rejection.
     */
    error(parameter: string, message: string): ArgumentResult<T>;
    /**
     * Constructs an [[ArgumentError]] with a custom type.
     * @param parameter The parameter that triggered the argument.
     * @param type The identifier for the error.
     * @param message The description message for the rejection.
     */
    error(parameter: string, type: string, message: string): ArgumentResult<T>;
}
export interface ArgumentContext extends Record<PropertyKey, unknown> {
    message: Message;
    command: Command;
    minimum?: number;
    maximum?: number;
    inclusive?: boolean;
}
//# sourceMappingURL=Argument.d.ts.map