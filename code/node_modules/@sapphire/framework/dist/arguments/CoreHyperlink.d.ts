/// <reference types="node" />
import type { PieceContext } from '@sapphire/pieces';
import { URL } from 'url';
import { Argument, ArgumentResult } from '../lib/structures/Argument';
export declare class CoreArgument extends Argument<URL> {
    constructor(context: PieceContext);
    run(argument: string): ArgumentResult<URL>;
}
//# sourceMappingURL=CoreHyperlink.d.ts.map