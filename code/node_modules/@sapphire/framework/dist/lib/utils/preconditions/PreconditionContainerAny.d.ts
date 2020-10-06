import type { Client, Message } from 'discord.js';
import type { UserError } from '../../errors/UserError';
import type { Command } from '../../structures/Command';
import { Result } from '../Result';
import type { Awaited } from '../Types';
import type { IPreconditionContainer } from './IPreconditionContainer';
import { PreconditionContainerSingleResolvable } from './PreconditionContainerSimple';
declare const enum PreconditionRunMode {
    Sequential = "sequential",
    Parallel = "parallel"
}
interface PreconditionContainerAnyDetailedData {
    entries: Entries;
    mode: PreconditionRunMode;
}
declare type Entry = PreconditionContainerSingleResolvable | PreconditionContainerResolvable;
declare type Entries = readonly Entry[];
export declare type PreconditionContainerResolvable = Entries | PreconditionContainerAnyDetailedData;
export declare class PreconditionContainerAny implements IPreconditionContainer {
    entries: IPreconditionContainer[];
    mode: PreconditionRunMode;
    constructor(client: Client, data: PreconditionContainerResolvable);
    run(message: Message, command: Command): Awaited<Result<unknown, UserError>>;
    protected runSequential(message: Message, command: Command): Promise<Result<unknown, UserError>>;
    protected runParallel(message: Message, command: Command): Promise<Result<unknown, UserError>>;
    private static resolveData;
}
export {};
//# sourceMappingURL=PreconditionContainerAny.d.ts.map