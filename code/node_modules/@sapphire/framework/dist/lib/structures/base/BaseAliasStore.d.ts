import { AliasStore, PieceContextExtras, StoreOptions } from '@sapphire/pieces';
import type { Client } from 'discord.js';
import type { BaseAliasPiece } from './BaseAliasPiece';
declare type Constructor<T> = new (...args: any[]) => T;
export declare class BaseAliasStore<T extends BaseAliasPiece> extends AliasStore<T> {
    readonly client: Client;
    constructor(client: Client, Ctor: Constructor<T>, options: StoreOptions<T>);
    protected get extras(): PieceContextExtras;
}
export {};
//# sourceMappingURL=BaseAliasStore.d.ts.map