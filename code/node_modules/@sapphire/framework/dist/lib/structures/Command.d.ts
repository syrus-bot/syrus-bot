import type { AliasPieceOptions } from '@sapphire/pieces';
import type { PieceContext } from '@sapphire/pieces/dist/lib/Piece';
import type { Message } from 'discord.js';
import * as Lexure from 'lexure';
import { Args } from '../utils/Args';
import { PreconditionContainerAll } from '../utils/preconditions/PreconditionContainer';
import type { PreconditionContainerResolvable } from '../utils/preconditions/PreconditionContainerAny';
import { FlagStrategyOptions } from '../utils/strategies/FlagUnorderedStrategy';
import type { Awaited } from '../utils/Types';
import { BaseAliasPiece } from './base/BaseAliasPiece';
export declare abstract class Command<T = Args> extends BaseAliasPiece {
    #private;
    /**
     * A basic summary about the command
     * @since 1.0.0
     */
    description: string;
    /**
     * The preconditions to be run.
     * @since 1.0.0
     */
    preconditions: PreconditionContainerAll;
    /**
     * Longer version of command's summary and how to use it
     * @since 1.0.0
     */
    detailedDescription: string;
    /**
     * The strategy to use for the lexer.
     * @since 1.0.0
     */
    strategy: Lexure.UnorderedStrategy;
    /**
     * @since 1.0.0
     * @param context The context.
     * @param options Optional Command settings.
     */
    protected constructor(context: PieceContext, { name, ...options }?: CommandOptions);
    /**
     * The pre-parse method. This method can be overriden by plugins to define their own argument parser.
     * @param message The message that triggered the command.
     * @param parameters The raw parameters as a single string.
     */
    preParse(message: Message, parameters: string): Awaited<T>;
    /**
     * Executes the command's logic.
     * @param message The message that triggered the command.
     * @param args The value returned by [[Command.preParse]], by default an instance of [[Args]].
     */
    abstract run(message: Message, args: T): Awaited<unknown>;
    /**
     * Defines the JSON.stringify behavior of the command.
     */
    toJSON(): Record<string, any>;
}
/**
 * The [[Command]] options.
 * @since 1.0.0
 */
export interface CommandOptions extends AliasPieceOptions {
    /**
     * The description for the command.
     * @since 1.0.0
     * @default ''
     */
    description?: string;
    /**
     * The detailed description for the command.
     * @since 1.0.0
     * @default ''
     */
    detailedDescription?: string;
    /**
     * The [[Precondition]]s to be run, accepts an array of their names.
     * @since 1.0.0
     * @default []
     */
    preconditions?: PreconditionContainerResolvable;
    /**
     * The options for the lexer strategy.
     * @since 1.0.0
     * @default {}
     */
    strategyOptions?: FlagStrategyOptions;
    /**
     * The quotes accepted by this command, pass `[]` to disable them.
     * @since 1.0.0
     * @default
     * [
     *   ['"', '"'], // Double quotes
     *   ['“', '”'], // Fancy quotes (on iOS)
     *   ['「', '」'] // Corner brackets (CJK)
     * ]
     */
    quotes?: [string, string][];
}
//# sourceMappingURL=Command.d.ts.map