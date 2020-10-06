"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PreconditionError = void 0;
const UserError_1 = require("./UserError");
class PreconditionError extends UserError_1.UserError {
    constructor(argument, type, message, extras = null) {
        super(type, message);
        this.precondition = argument;
        this.extras = extras;
    }
}
exports.PreconditionError = PreconditionError;
//# sourceMappingURL=PreconditionError.js.map