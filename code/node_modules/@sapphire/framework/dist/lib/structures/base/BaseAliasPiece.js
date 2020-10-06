"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseAliasPiece = void 0;
const pieces_1 = require("@sapphire/pieces");
class BaseAliasPiece extends pieces_1.AliasPiece {
    get client() {
        return this.extras.client;
    }
}
exports.BaseAliasPiece = BaseAliasPiece;
//# sourceMappingURL=BaseAliasPiece.js.map