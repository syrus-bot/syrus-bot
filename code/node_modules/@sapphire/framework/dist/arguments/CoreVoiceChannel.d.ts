import type { PieceContext } from '@sapphire/pieces';
import type { VoiceChannel } from 'discord.js';
import { Argument, ArgumentContext, ArgumentResult } from '../lib/structures/Argument';
export declare class CoreArgument extends Argument<VoiceChannel> {
    constructor(context: PieceContext);
    run(argument: string, context: ArgumentContext): ArgumentResult<VoiceChannel>;
}
//# sourceMappingURL=CoreVoiceChannel.d.ts.map