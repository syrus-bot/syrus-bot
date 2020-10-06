"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CoreArgument = void 0;
const Argument_1 = require("../lib/structures/Argument");
class CoreArgument extends Argument_1.Argument {
    constructor(context) {
        super(context, { name: 'integer' });
    }
    run(argument, context) {
        const parsed = Number(argument);
        if (!Number.isInteger(parsed)) {
            return this.error(argument, 'ArgumentIntegerInvalidNumber', 'The argument did not resolve to an integer.');
        }
        if (typeof context.minimum === 'number' && parsed < context.minimum) {
            return this.error(argument, 'ArgumentIntegerTooSmall', 'The argument is too small.');
        }
        if (typeof context.maximum === 'number' && parsed > context.maximum) {
            return this.error(argument, 'ArgumentIntegerTooBig', 'The argument is too big.');
        }
        return this.ok(parsed);
    }
}
exports.CoreArgument = CoreArgument;
//# sourceMappingURL=CoreInteger.js.map