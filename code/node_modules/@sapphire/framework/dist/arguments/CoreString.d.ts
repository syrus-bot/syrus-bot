import type { PieceContext } from '@sapphire/pieces';
import { Argument, ArgumentContext, ArgumentResult } from '../lib/structures/Argument';
export declare class CoreArgument extends Argument<string> {
    constructor(context: PieceContext);
    run(argument: string, context: ArgumentContext): ArgumentResult<string>;
}
//# sourceMappingURL=CoreString.d.ts.map