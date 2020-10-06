import type { PieceContext } from '@sapphire/pieces';
import { Message } from 'discord.js';
import { Event } from '../../lib/structures/Event';
import { Events } from '../../lib/types/Events';
export declare class CoreEvent extends Event<Events.Message> {
    private readonly requiredPermissions;
    constructor(context: PieceContext);
    run(message: Message): Promise<void>;
    private canRunInChannel;
    private getMentionPrefix;
    private getPrefix;
}
//# sourceMappingURL=CoreMessageParser.d.ts.map