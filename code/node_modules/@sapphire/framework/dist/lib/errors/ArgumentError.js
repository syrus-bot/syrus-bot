"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ArgumentError = void 0;
const UserError_1 = require("./UserError");
class ArgumentError extends UserError_1.UserError {
    constructor(argument, parameter, type, message) {
        super(type, message);
        this.argument = argument;
        this.parameter = parameter;
    }
}
exports.ArgumentError = ArgumentError;
//# sourceMappingURL=ArgumentError.js.map