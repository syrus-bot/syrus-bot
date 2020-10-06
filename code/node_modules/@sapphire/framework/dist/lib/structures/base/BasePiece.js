"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BasePiece = void 0;
const pieces_1 = require("@sapphire/pieces");
class BasePiece extends pieces_1.Piece {
    get client() {
        return this.extras.client;
    }
}
exports.BasePiece = BasePiece;
//# sourceMappingURL=BasePiece.js.map