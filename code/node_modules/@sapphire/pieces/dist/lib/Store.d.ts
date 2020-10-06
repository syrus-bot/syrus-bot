import Collection from '@discordjs/collection';
import type { Piece, PieceContextExtras } from './Piece';
import type { FilterResult } from './strategies/filters/IFilter';
import type { ILoaderResult, ILoaderResultEntry } from './strategies/loaders/ILoader';
export declare type Constructor<T> = new (...args: any[]) => T;
export declare type Awaited<T> = PromiseLike<T> | T;
/**
 * The error handler.
 * @example
 * ```typescript
 * // Log errors to console
 * new Store(MyPiece, {
 *   onError: (error) => console.error(error)
 * });
 */
export interface StoreOptionsErrorHandler {
    /**
     * @param error The error that was thrown.
     * @param path The path of the file that caused the error to be thrown.
     */
    (error: Error, path: string): void;
}
/**
 * The filter hook, use this to override the default behavior.
 * @example
 * ```typescript
 * // ts-node support
 * new Store(MyPiece, {
 *   filterHook: (path) => {
 *     const extension = extname(path);
 *     if (!['.js', '.ts'].includes(extension)) return null;
 *     const name = basename(path, extension);
 *     return { extension, name };
 *   }
 * });
 */
export interface StoreOptionsFilterHook {
    /**
     * @param path The path of the file to get the name and extension from,
     * allowing null to stop the store from loading it, e.g. on unsupported extensions.
     */
    (path: string): FilterResult;
}
/**
 * The pre-load hook, use this to override the loader.
 * @example
 * ```typescript
 * // CommonJS support:
 * new Store(MyPiece, {
 *   preloadHook: (path) => require(path)
 * });
 * ```
 * @example
 * ```typescript
 * // ESM support:
 * new Store(MyPiece, {
 *   preloadHook: (path) => import(path)
 * });
 * ```
 */
export interface StoreOptionsPreLoadHook<T extends Piece> {
    /**
     * @param path The path of the file to be loaded.
     */
    (path: string): Awaited<Constructor<T> & Record<PropertyKey, unknown>>;
}
/**
 * The load hook, use this to override the loader.
 * @example
 * ```typescript
 * // Using multi-loader:
 * import { LoadMultiple } from '@sapphire/cache';
 *
 * new Store(MyPiece, {
 *   loadHook: LoadMultiple.load.bind(LoadMultiple)
 * });
 */
export interface StoreOptionsLoadHook<T extends Piece> {
    (store: Store<T>, path: string): ILoaderResult<T>;
}
/**
 * The post-load handler.
 */
export interface StoreOptionsPostLoadHandler<T extends Piece> {
    /**
     * @param store The store that holds the piece.
     * @param piece The piece that was loaded.
     */
    (store: Store<T>, piece: T): void;
}
/**
 * The unload handler.
 */
export interface StoreOptionsUnLoadHandler<T extends Piece> {
    /**
     * @param store The store that held the piece.
     * @param piece The piece that was unloaded.
     */
    (store: Store<T>, piece: T): void;
}
/**
 * The options for the store, this features both hooks (changes the behaviour) and handlers (similar to event listeners).
 */
export interface StoreOptions<T extends Piece, C = unknown> {
    /**
     * The name for this store.
     */
    readonly name: string;
    /**
     * The paths to load pieces from, should be absolute.
     */
    readonly paths?: readonly string[];
    /**
     * The context to be passed to the pieces.
     */
    readonly context?: C;
    /**
     * The filter hook. Setting this will modify the behaviour of the store.
     * @default LoadJavaScript.getNameData.bind(LoadJavaScript)
     */
    readonly filterHook?: StoreOptionsFilterHook;
    /**
     * The preload hook. Setting this will modify the behaviour of the store.
     * @default ((path) => Promise.resolve().then(() => require(path))
     */
    readonly preloadHook?: StoreOptionsPreLoadHook<T>;
    /**
     * The load hook. Setting this will modify the behaviour of the store.
     * @default LoadSingle.onLoad.bind(LoadSingle)
     */
    readonly loadHook?: StoreOptionsLoadHook<T>;
    /**
     * The post-load handler.
     * @default (() => void 0)
     */
    readonly onPostLoad?: StoreOptionsPostLoadHandler<T>;
    /**
     * The unload handler.
     * @default (() => void 0)
     */
    readonly onUnload?: StoreOptionsUnLoadHandler<T>;
    /**
     * The error handler.
     * @default (error) => console.error(error)
     */
    readonly onError?: StoreOptionsErrorHandler;
}
/**
 * The store class which contains [[Piece]]s.
 */
export declare class Store<T extends Piece> extends Collection<string, T> {
    readonly Constructor: Constructor<T>;
    readonly name: string;
    readonly paths: Set<string>;
    readonly filterHook: StoreOptionsFilterHook;
    readonly preloadHook: StoreOptionsPreLoadHook<T>;
    readonly loadHook: StoreOptionsLoadHook<T>;
    readonly onPostLoad: StoreOptionsPostLoadHandler<T>;
    readonly onUnload: StoreOptionsUnLoadHandler<T>;
    readonly onError: StoreOptionsErrorHandler;
    /**
     * @param constructor The piece constructor this store loads.
     * @param options The options for the store.
     */
    constructor(constructor: Constructor<T>, options: StoreOptions<T>);
    /**
     * Registers a directory into the store.
     * @param path The path to be added.
     * @example
     * ```typescript
     * store
     *   .registerPath(resolve('commands'))
     *   .registerPath(resolve('third-party', 'commands'));
     * ```
     */
    registerPath(path: string): this;
    /**
     * Loads a piece or more from a path.
     * @param path The path of the file to load.
     * @return An async iterator that yields each one of the loaded pieces.
     */
    load(path: string): AsyncIterableIterator<T>;
    /**
     * Unloads a piece given its instance or its name.
     * @param name The name of the file to load.
     * @return Returns the piece that was unloaded.
     */
    unload(name: string | T): Promise<T>;
    /**
     * Loads all pieces from all directories specified by [[paths]].
     */
    loadAll(): Promise<void>;
    /**
     * Resolves a piece by its name or its instance.
     * @param name The name of the piece or the instance itself.
     * @return The resolved piece.
     */
    resolve(name: string | T): T;
    /**
     * The extras to be passed to the constructor of all pieces.
     */
    protected get extras(): PieceContextExtras;
    /**
     * Inserts a piece into the store.
     * @param piece The piece to be inserted into the store.
     * @return The inserted piece.
     */
    protected insert(piece: T): Promise<T>;
    /**
     * Constructs a [[Piece]] instance.
     * @param Ctor The [[Piece]]'s constructor used to build the instance.
     * @param path The path of the file.
     * @param name The name of the piece.
     */
    protected construct(Ctor: ILoaderResultEntry<T>, path: string, name: string): T;
    /**
     * Loads a directory into the store.
     * @param directory The directory to load the pieces from.
     * @return An async iterator that yields the pieces to be loaded into the store.
     */
    private loadPath;
    /**
     * Retrieves all possible pieces.
     * @param path The directory to load the pieces from.
     * @return An async iterator that yields the modules to be processed and loaded into the store.
     */
    private walk;
}
//# sourceMappingURL=Store.d.ts.map