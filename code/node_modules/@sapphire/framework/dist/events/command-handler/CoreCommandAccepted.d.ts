import type { PieceContext } from '@sapphire/pieces';
import type { Message } from 'discord.js';
import type { Command } from '../../lib/structures/Command';
import { Event } from '../../lib/structures/Event';
import { Events } from '../../lib/types/Events';
export declare class CoreEvent extends Event<Events.CommandAccepted> {
    constructor(context: PieceContext);
    run(message: Message, command: Command, parameters: string): Promise<void>;
}
//# sourceMappingURL=CoreCommandAccepted.d.ts.map