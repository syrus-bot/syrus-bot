import { LoaderError } from './LoaderError';
/**
 * Describes a [[LoaderErrorType.EmptyModule]] loader error and adds a path for easy identification.
 */
export declare class MissingExportsError extends LoaderError {
    /**
     * The path of the module that did not have exports.
     */
    readonly path: string;
    constructor(path: string);
}
//# sourceMappingURL=MissingExportsError.d.ts.map