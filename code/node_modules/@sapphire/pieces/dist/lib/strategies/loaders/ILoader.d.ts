import type { Piece } from '../../Piece';
import type { Store } from '../../Store';
import type { Ctor } from '../Shared';
/**
 * Represents an entry from [[ILoaderResult]].
 */
export declare type ILoaderResultEntry<T extends Piece> = Ctor<ConstructorParameters<typeof Piece>, T>;
/**
 * Represents the return data from [[ILoader.load]].
 */
export declare type ILoaderResult<T extends Piece> = AsyncIterableIterator<ILoaderResultEntry<T>>;
/**
 * An abstracted loader interface.
 */
export interface ILoader {
    /**
     * Loads one or more pieces from from the given path.
     * @param store The store that is responsible for loading the given path.
     * @param path The path to load pieces from.
     */
    load<T extends Piece>(store: Store<T>, path: string): ILoaderResult<T>;
}
//# sourceMappingURL=ILoader.d.ts.map