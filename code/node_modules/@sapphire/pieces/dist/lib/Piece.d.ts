import type { Awaited, Store } from './Store';
/**
 * Represents the data from [[PieceContext.extras]] and may be used for dependency injection.
 * Libraries can provide strict typing by augmenting this module, check
 * {@link https://www.typescriptlang.org/docs/handbook/declaration-merging.html#module-augmentation module augmentation}
 * for more information.
 */
export interface PieceContextExtras extends Record<PropertyKey, unknown> {
}
/**
 * The context for the piece, contains extra information from the store,
 * the piece's path, and the store that loaded it.
 */
export interface PieceContext {
    /**
     * The extra information for the piece.
     */
    readonly extras: PieceContextExtras;
    /**
     * The path the module was loaded from.
     */
    readonly path: string;
    /**
     * The module's name extracted from the path.
     */
    readonly name: string;
    /**
     * The store that loaded the piece.
     */
    readonly store: Store<Piece>;
}
/**
 * The options for the [[Piece]].
 */
export interface PieceOptions {
    /**
     * The name for the piece.
     * @default ''
     */
    readonly name?: string;
    /**
     * Whether or not the piece should be enabled. If set to false, the piece will be unloaded.
     * @default true
     */
    readonly enabled?: boolean;
}
/**
 * The piece to be stored in [[Store]] instances.
 */
export declare class Piece {
    /**
     * The extra given by the store or by the user.
     */
    readonly extras: PieceContextExtras;
    /**
     * The store that contains the piece.
     */
    readonly store: Store<Piece>;
    /**
     * The path to the piece's file.
     */
    readonly path: string;
    /**
     * The name of the piece.
     */
    readonly name: string;
    /**
     * Whether or not the piece is enabled.
     */
    enabled: boolean;
    constructor(context: PieceContext, options?: PieceOptions);
    /**
     * Per-piece listener that is called when the piece is loaded into the store.
     * Useful to set-up asynchronous initialization tasks.
     */
    onLoad(): Awaited<unknown>;
    /**
     * Per-piece listener that is called when the piece is unloaded from the store.
     * Useful to set-up clean-up tasks.
     */
    onUnload(): Awaited<unknown>;
    toJSON(): Record<string, any>;
}
//# sourceMappingURL=Piece.d.ts.map