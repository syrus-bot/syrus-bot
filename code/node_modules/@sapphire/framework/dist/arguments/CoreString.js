"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CoreArgument = void 0;
const Argument_1 = require("../lib/structures/Argument");
class CoreArgument extends Argument_1.Argument {
    constructor(context) {
        super(context, { name: 'string' });
    }
    run(argument, context) {
        if (typeof context.minimum === 'number' && argument.length < context.minimum) {
            return this.error(argument, 'ArgumentStringTooShort', 'The argument is too short.');
        }
        if (typeof context.maximum === 'number' && argument.length > context.maximum) {
            return this.error(argument, 'ArgumentStringTooLong', 'The argument is too long.');
        }
        return this.ok(argument);
    }
}
exports.CoreArgument = CoreArgument;
//# sourceMappingURL=CoreString.js.map