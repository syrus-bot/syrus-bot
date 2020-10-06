import type { ClientOptions } from 'discord.js';
import type { SapphireClient } from '../SapphireClient';
import type { Awaited } from '../utils/Types';
import { postInitialization, postLogin, preGenericsInitialization, preInitialization, preLogin } from './symbols';
export declare abstract class Plugin {
    static [preGenericsInitialization]?: (this: SapphireClient, options: ClientOptions) => void;
    static [preInitialization]?: (this: SapphireClient, options: ClientOptions) => void;
    static [postInitialization]?: (this: SapphireClient, options: ClientOptions) => void;
    static [preLogin]?: (this: SapphireClient, options: ClientOptions) => Awaited<void>;
    static [postLogin]?: (this: SapphireClient, options: ClientOptions) => Awaited<void>;
}
//# sourceMappingURL=Plugin.d.ts.map