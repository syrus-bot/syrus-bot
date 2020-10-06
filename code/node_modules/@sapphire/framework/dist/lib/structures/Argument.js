"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Argument = void 0;
const Args_1 = require("../utils/Args");
const Result_1 = require("../utils/Result");
const BaseAliasPiece_1 = require("./base/BaseAliasPiece");
class Argument extends BaseAliasPiece_1.BaseAliasPiece {
    ok(value) {
        return Result_1.ok(value);
    }
    error(parameter, typeOrMessage, rawMessage) {
        return Result_1.err(Args_1.Args.error(this, parameter, typeOrMessage, rawMessage));
    }
}
exports.Argument = Argument;
//# sourceMappingURL=Argument.js.map