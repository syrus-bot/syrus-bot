import type { PieceContext } from '@sapphire/pieces';
import type { Message } from 'discord.js';
import { Event } from '../../lib/structures/Event';
import { Events } from '../../lib/types/Events';
export declare class CoreEvent extends Event<Events.PrefixedMessage> {
    constructor(context: PieceContext);
    run(message: Message, prefix: string): void;
}
//# sourceMappingURL=CorePrefixedMessage.d.ts.map