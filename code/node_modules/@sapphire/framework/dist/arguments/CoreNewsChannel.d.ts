import type { PieceContext } from '@sapphire/pieces';
import type { NewsChannel } from 'discord.js';
import { Argument, ArgumentContext, ArgumentResult } from '../lib/structures/Argument';
export declare class CoreArgument extends Argument<NewsChannel> {
    constructor(context: PieceContext);
    run(argument: string, context: ArgumentContext): ArgumentResult<NewsChannel>;
}
//# sourceMappingURL=CoreNewsChannel.d.ts.map