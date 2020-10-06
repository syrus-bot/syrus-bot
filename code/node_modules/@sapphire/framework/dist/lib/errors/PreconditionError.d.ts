import type { Precondition } from '../structures/Precondition';
import { UserError } from './UserError';
export declare type PreconditionErrorExtras = object | null;
export declare class PreconditionError extends UserError {
    readonly precondition: Precondition;
    readonly extras: PreconditionErrorExtras;
    constructor(argument: Precondition, type: string, message: string, extras?: PreconditionErrorExtras);
}
//# sourceMappingURL=PreconditionError.d.ts.map