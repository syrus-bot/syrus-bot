export declare const enum LoaderErrorType {
    EmptyModule = "EMPTY_MODULE",
    UnloadedPiece = "UNLOADED_PIECE",
    IncorrectType = "INCORRECT_TYPE"
}
/**
 * Describes a loader error with a type for easy indentification.
 */
export declare class LoaderError extends Error {
    /**
     * The type of the error that was thrown.
     */
    readonly type: LoaderErrorType;
    constructor(type: LoaderErrorType, message: string);
}
//# sourceMappingURL=LoaderError.d.ts.map