import type { Message } from 'discord.js';
import type { Awaited } from '../Types';
import type { IInternationalization } from './IInternationalization';
export declare class Internationalization implements IInternationalization {
    defaultName: string;
    constructor(defaultName: string);
    resolveNameFromMessage(message: Message): Awaited<string>;
    resolveValue(): Awaited<string>;
}
//# sourceMappingURL=Internationalization.d.ts.map