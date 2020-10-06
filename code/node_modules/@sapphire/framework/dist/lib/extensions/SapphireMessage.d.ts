import type { Awaited } from '@sapphire/pieces';
import { Message, MessageAdditions, MessageOptions, SplitOptions } from 'discord.js';
declare const SapphireMessage_base: typeof Message;
export declare class SapphireMessage extends SapphireMessage_base {
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
export {};
//# sourceMappingURL=SapphireMessage.d.ts.map