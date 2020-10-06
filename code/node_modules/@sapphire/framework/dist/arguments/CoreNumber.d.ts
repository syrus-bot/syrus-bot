import type { PieceContext } from '@sapphire/pieces';
import { Argument, ArgumentContext, ArgumentResult } from '../lib/structures/Argument';
export declare class CoreArgument extends Argument<number> {
    constructor(context: PieceContext);
    run(argument: string, context: ArgumentContext): ArgumentResult<number>;
}
//# sourceMappingURL=CoreNumber.d.ts.map