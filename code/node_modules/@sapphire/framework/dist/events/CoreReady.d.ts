import type { PieceContext } from '@sapphire/pieces';
import { Event } from '../lib/structures/Event';
import { Events } from '../lib/types/Events';
export declare class CoreEvent extends Event<Events.Ready> {
    constructor(context: PieceContext);
    run(): void;
}
//# sourceMappingURL=CoreReady.d.ts.map