import type { PieceContext } from '@sapphire/pieces';
import { Argument, ArgumentContext, ArgumentResult } from '../lib/structures/Argument';
export declare class CoreArgument extends Argument<Date> {
    constructor(context: PieceContext);
    run(argument: string, context: ArgumentContext): ArgumentResult<Date>;
}
//# sourceMappingURL=CoreDate.d.ts.map