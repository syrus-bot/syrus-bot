import type { PieceContext } from '@sapphire/pieces';
import type { TextChannel } from 'discord.js';
import { Argument, ArgumentContext, ArgumentResult } from '../lib/structures/Argument';
export declare class CoreArgument extends Argument<TextChannel> {
    constructor(context: PieceContext);
    run(argument: string, context: ArgumentContext): ArgumentResult<TextChannel>;
}
//# sourceMappingURL=CoreTextChannel.d.ts.map