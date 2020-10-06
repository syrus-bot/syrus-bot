"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserError = void 0;
/**
 * The UserError class to be emitted in the pieces.
 */
class UserError extends Error {
    /**
     * Constructs an UserError.
     * @param type The identifier, useful to localize emitted errors.
     * @param message The error message.
     */
    constructor(type, message) {
        super(message);
        this.identifier = type;
    }
}
exports.UserError = UserError;
//# sourceMappingURL=UserError.js.map