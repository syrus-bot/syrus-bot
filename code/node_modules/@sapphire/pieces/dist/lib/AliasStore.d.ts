import Collection from '@discordjs/collection';
import type { AliasPiece } from './AliasPiece';
import { Store } from './Store';
/**
 * The store class which contains [[AliasPiece]]s.
 */
export declare class AliasStore<T extends AliasPiece> extends Store<T> {
    /**
     * The aliases referencing to pieces.
     */
    readonly aliases: Collection<string, T>;
    /**
     * Looks up the name by the store, falling back to an alias lookup.
     * @param key The key to look for.
     */
    get(key: string): T | undefined;
    /**
     * Unloads a piece given its instance or its name, and removes all the aliases.
     * @param name The name of the file to load.
     * @return Returns the piece that was unloaded.
     */
    unload(name: string | T): Promise<T>;
    /**
     * Inserts a piece into the store, and adds all the aliases.
     * @param piece The piece to be inserted into the store.
     * @return The inserted piece.
     */
    protected insert(piece: T): Promise<T>;
}
//# sourceMappingURL=AliasStore.d.ts.map