import type { PieceContext } from '@sapphire/pieces';
import { GuildMember } from 'discord.js';
import { Argument, ArgumentContext, AsyncArgumentResult } from '../lib/structures/Argument';
export declare class CoreArgument extends Argument<GuildMember> {
    constructor(context: PieceContext);
    run(argument: string, context: ArgumentContext): AsyncArgumentResult<GuildMember>;
}
//# sourceMappingURL=CoreMember.d.ts.map