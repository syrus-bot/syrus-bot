import type { PieceContext } from '@sapphire/pieces';
import type { DMChannel } from 'discord.js';
import { Argument, ArgumentResult } from '../lib/structures/Argument';
export declare class CoreArgument extends Argument<DMChannel> {
    constructor(context: PieceContext);
    run(argument: string): ArgumentResult<DMChannel>;
}
//# sourceMappingURL=CoreDMChannel.d.ts.map