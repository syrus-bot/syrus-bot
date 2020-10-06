"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AliasPiece = void 0;
const Piece_1 = require("./Piece");
/**
 * The piece to be stored in [[AliasStore]] instances.
 */
class AliasPiece extends Piece_1.Piece {
    constructor(context, options = {}) {
        var _a;
        super(context, options);
        /**
         * The aliases for the piece.
         */
        Object.defineProperty(this, "aliases", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.aliases = (_a = options.aliases) !== null && _a !== void 0 ? _a : [];
    }
    toJSON() {
        return {
            ...super.toJSON(),
            aliases: this.aliases.slice()
        };
    }
}
exports.AliasPiece = AliasPiece;
//# sourceMappingURL=AliasPiece.js.map