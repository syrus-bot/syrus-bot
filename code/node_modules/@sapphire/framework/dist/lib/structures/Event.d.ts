/// <reference types="node" />
import type { PieceContext, PieceOptions } from '@sapphire/pieces';
import type { Client, ClientEvents } from 'discord.js';
import type { EventEmitter } from 'events';
import { BasePiece } from './base/BasePiece';
export declare abstract class Event<E extends keyof ClientEvents | symbol = ''> extends BasePiece {
    #private;
    readonly emitter: EventEmitter | null;
    readonly event: string;
    readonly once: boolean;
    constructor(context: PieceContext, options?: EventOptions);
    abstract run(...args: E extends keyof ClientEvents ? ClientEvents[E] : unknown[]): unknown;
    onLoad(): void;
    onUnload(): void;
    toJSON(): Record<PropertyKey, unknown>;
    private _run;
    private _runOnce;
}
export interface EventOptions extends PieceOptions {
    readonly emitter?: keyof Client | EventEmitter;
    readonly event?: string;
    readonly once?: boolean;
}
//# sourceMappingURL=Event.d.ts.map