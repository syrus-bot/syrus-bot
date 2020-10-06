import { PieceContextExtras, Store, StoreOptions } from '@sapphire/pieces';
import type { Client } from 'discord.js';
import type { BasePiece } from './BasePiece';
declare type Constructor<T> = new (...args: any[]) => T;
export declare class BaseStore<T extends BasePiece> extends Store<T> {
    readonly client: Client;
    constructor(client: Client, Ctor: Constructor<T>, options: StoreOptions<T>);
    protected get extras(): PieceContextExtras;
}
export {};
//# sourceMappingURL=BaseStore.d.ts.map