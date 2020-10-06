import type { PieceContext } from '@sapphire/pieces';
import type { Role } from 'discord.js';
import { Argument, ArgumentContext, ArgumentResult } from '../lib/structures/Argument';
export declare class CoreArgument extends Argument<Role> {
    constructor(context: PieceContext);
    run(argument: string, context: ArgumentContext): ArgumentResult<Role>;
}
//# sourceMappingURL=CoreRole.d.ts.map