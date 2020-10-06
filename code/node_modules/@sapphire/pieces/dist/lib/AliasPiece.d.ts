import { Piece, PieceContext, PieceOptions } from './Piece';
export interface AliasPieceOptions extends PieceOptions {
    /**
     * The aliases for the piece.
     * @default []
     */
    readonly aliases?: readonly string[];
}
/**
 * The piece to be stored in [[AliasStore]] instances.
 */
export declare class AliasPiece extends Piece {
    /**
     * The aliases for the piece.
     */
    readonly aliases: readonly string[];
    constructor(context: PieceContext, options?: AliasPieceOptions);
    toJSON(): Record<string, any>;
}
//# sourceMappingURL=AliasPiece.d.ts.map