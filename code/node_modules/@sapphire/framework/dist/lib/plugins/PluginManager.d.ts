import type { ClientOptions } from 'discord.js';
import type { SapphireClient } from '../SapphireClient';
import { PluginHook } from '../types/Enums';
import type { Awaited } from '../utils/Types';
import type { Plugin } from './Plugin';
export declare type AsyncPluginHooks = PluginHook.PreLogin | PluginHook.PostLogin;
export interface SapphirePluginAsyncHook {
    (this: SapphireClient, options: ClientOptions): Awaited<unknown>;
}
export declare type SyncPluginHooks = Exclude<PluginHook, AsyncPluginHooks>;
export interface SapphirePluginHook {
    (this: SapphireClient, options: ClientOptions): unknown;
}
export interface SapphirePluginHookEntry<T = SapphirePluginHook | SapphirePluginAsyncHook> {
    hook: T;
    type: PluginHook;
    name?: string;
}
export declare class PluginManager {
    readonly registry: Set<SapphirePluginHookEntry<SapphirePluginAsyncHook | SapphirePluginHook>>;
    registerHook(hook: SapphirePluginHook, type: SyncPluginHooks, name?: string): this;
    registerHook(hook: SapphirePluginAsyncHook, type: AsyncPluginHooks, name?: string): this;
    registerPreGenericsInitializationHook(hook: SapphirePluginHook, name?: string): this;
    registerPreInitializationHook(hook: SapphirePluginHook, name?: string): this;
    registerPostInitializationHook(hook: SapphirePluginHook, name?: string): this;
    registerPreLoginHook(hook: SapphirePluginAsyncHook, name?: string): this;
    registerPostLoginHook(hook: SapphirePluginAsyncHook, name?: string): this;
    use(plugin: typeof Plugin): this;
    values(): Generator<SapphirePluginHookEntry, void, unknown>;
    values(hook: SyncPluginHooks): Generator<SapphirePluginHookEntry<SapphirePluginHook>, void, unknown>;
    values(hook: AsyncPluginHooks): Generator<SapphirePluginHookEntry<SapphirePluginAsyncHook>, void, unknown>;
}
//# sourceMappingURL=PluginManager.d.ts.map