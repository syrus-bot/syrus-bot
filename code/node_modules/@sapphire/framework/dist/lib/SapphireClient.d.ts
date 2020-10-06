import type { Piece, Store } from '@sapphire/pieces';
import { Client, ClientOptions, Message } from 'discord.js';
import type { Plugin } from './plugins/Plugin';
import { PluginManager } from './plugins/PluginManager';
import { ArgumentStore } from './structures/ArgumentStore';
import { CommandStore } from './structures/CommandStore';
import { EventStore } from './structures/EventStore';
import { PreconditionStore } from './structures/PreconditionStore';
import type { IInternationalization } from './utils/i18n/IInternationalization';
import { ILogger, LogLevel } from './utils/logger/ILogger';
import type { Awaited } from './utils/Types';
import './extensions/SapphireMessage';
export interface SapphirePrefixHook {
    (message: Message): Awaited<string | readonly string[] | null>;
}
export declare class SapphireClient extends Client {
    /**
     * The client's ID, used for the user prefix.
     * @since 1.0.0
     */
    id: string | null;
    /**
     * The logger to be used by the framework and plugins.
     * @since 1.0.0
     */
    logger: ILogger;
    /**
     * The internationalization handler to be used by the framework and plugins.
     * @since 1.0.0
     */
    i18n: IInternationalization;
    /**
     * The arguments the framework has registered.
     * @since 1.0.0
     */
    arguments: ArgumentStore;
    /**
     * The commands the framework has registered.
     * @since 1.0.0
     */
    commands: CommandStore;
    /**
     * The events the framework has registered.
     * @since 1.0.0
     */
    events: EventStore;
    /**
     * The precondition the framework has registered.
     * @since 1.0.0
     */
    preconditions: PreconditionStore;
    /**
     * The registered stores.
     * @since 1.0.0
     */
    stores: Set<Store<Piece>>;
    constructor(options?: ClientOptions);
    /**
     * Registers all user directories from the process working directory, the default value is obtained by assuming
     * CommonJS (high accuracy) but with fallback for ECMAScript Modules (reads package.json's `main` entry, fallbacks
     * to `process.cwd()`).
     *
     * By default, if you have this folder structure:
     * ```
     * /home/me/my-bot
     * ├─ src
     * │  ├─ commands
     * │  ├─ events
     * │  └─ main.js
     * └─ package.json
     * ```
     *
     * And you run `node src/main.js`, the directories `/home/me/my-bot/src/commands` and `/home/me/my-bot/src/events` will
     * be registered for the commands and events stores respectively, since both directories are located in the same
     * directory as your main file.
     *
     * **Note**: this also registers directories for all other stores, even if they don't have a folder, this allows you
     * to create new pieces and hot-load them later anytime.
     * @param rootDirectory The root directory to register pieces at.
     */
    registerUserDirectories(rootDirectory?: string): void;
    /**
     * Registers a store.
     * @param store The store to register.
     */
    registerStore<T extends Piece>(store: Store<T>): this;
    /**
     * The method to be overriden by the developer.
     * @since 1.0.0
     * @return A string for a single prefix, an array of strings for matching multiple, or null for no match (mention prefix only).
     * @example
     * ```typescript
     * // Return always the same prefix (unconfigurable):
     * client.fetchPrefix = () => '!';
     * ```
     * @example
     * ```typescript
     * // Retrieving the prefix from a SQL database:
     * client.fetchPrefix = async (message) => {
     *   const guild = await driver.getOne('SELECT prefix FROM public.guild WHERE id = $1', [message.guild.id]);
     *   return guild?.prefix ?? '!';
     * };
     * ```
     * @example
     * ```typescript
     * // Retrieving the prefix from an ORM:
     * client.fetchPrefix = async (message) => {
     *   const guild = await driver.getRepository(GuildEntity).findOne({ id: message.guild.id });
     *   return guild?.prefix ?? '!';
     * };
     * ```
     */
    fetchPrefix: SapphirePrefixHook;
    /**
     * Loads all pieces, then logs the client in, establishing a websocket connection to Discord.
     * @since 1.0.0
     * @param token Token of the account to log in with.
     * @retrun Token of the account used.
     */
    login(token?: string): Promise<string>;
    static plugins: PluginManager;
    static use(plugin: typeof Plugin): typeof SapphireClient;
}
export interface ClientLoggerOptions {
    level?: LogLevel;
    instance?: ILogger;
}
export interface ClientInternationalizationOptions {
    defaultName?: string;
    instance?: IInternationalization;
}
declare module 'discord.js' {
    interface Client {
        id: string | null;
        logger: ILogger;
        i18n: IInternationalization;
        arguments: ArgumentStore;
        commands: CommandStore;
        events: EventStore;
        preconditions: PreconditionStore;
        fetchPrefix: SapphirePrefixHook;
    }
    interface ClientOptions {
        id?: string;
        logger?: ClientLoggerOptions;
        i18n?: ClientInternationalizationOptions;
    }
    interface Message {
        fetchLanguage(): Awaited<string>;
        fetchLanguageKey(key: string, ...values: readonly unknown[]): Promise<string>;
        sendTranslated(key: string, values?: readonly unknown[], options?: MessageOptions | (MessageOptions & {
            split?: false;
        }) | MessageAdditions): Promise<Message>;
        sendTranslated(key: string, values?: readonly unknown[], options?: MessageOptions & {
            split: true | SplitOptions;
        }): Promise<Message[]>;
        sendTranslated(key: string, options?: MessageOptions | (MessageOptions & {
            split?: false;
        }) | MessageAdditions): Promise<Message>;
        sendTranslated(key: string, options?: MessageOptions & {
            split: true | SplitOptions;
        }): Promise<Message[]>;
    }
}
//# sourceMappingURL=SapphireClient.d.ts.map