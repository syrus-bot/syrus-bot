import type { IArgument } from '../structures/Argument';
import { UserError } from './UserError';
export declare class ArgumentError<T> extends UserError {
    readonly argument: IArgument<T>;
    readonly parameter: string;
    constructor(argument: IArgument<T>, parameter: string, type: string, message: string);
}
//# sourceMappingURL=ArgumentError.d.ts.map