import type { PieceContext } from '@sapphire/pieces';
import type { Channel } from 'discord.js';
import { Argument, ArgumentContext, ArgumentResult } from '../lib/structures/Argument';
export declare class CoreArgument extends Argument<Channel> {
    constructor(context: PieceContext);
    run(argument: string, context: ArgumentContext): ArgumentResult<Channel>;
}
//# sourceMappingURL=CoreChannel.d.ts.map