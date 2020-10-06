"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Precondition = void 0;
const PreconditionError_1 = require("../errors/PreconditionError");
const Result_1 = require("../utils/Result");
const BasePiece_1 = require("./base/BasePiece");
class Precondition extends BasePiece_1.BasePiece {
    ok() {
        return Result_1.ok();
    }
    error(typeOrMessage, rawMessage, rawExtras) {
        const [type, message, extras] = typeof rawMessage === 'string' ? [typeOrMessage, rawMessage, rawExtras] : [this.name, typeOrMessage, rawMessage];
        return Result_1.err(new PreconditionError_1.PreconditionError(this, type, message, extras));
    }
}
exports.Precondition = Precondition;
//# sourceMappingURL=Precondition.js.map