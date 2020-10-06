"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CoreArgument = void 0;
const Argument_1 = require("../lib/structures/Argument");
class CoreArgument extends Argument_1.Argument {
    constructor(context) {
        super(context, { name: 'number' });
    }
    run(argument, context) {
        const parsed = Number(argument);
        if (Number.isNaN(parsed)) {
            return this.error(argument, 'ArgumentNumberInvalidNumber', 'The argument did not resolve to a valid number.');
        }
        if (typeof context.minimum === 'number' && parsed < context.minimum) {
            return this.error(argument, 'ArgumentNumberTooSmall', 'The argument is too small.');
        }
        if (typeof context.maximum === 'number' && parsed > context.maximum) {
            return this.error(argument, 'ArgumentNumberTooBig', 'The argument is too big.');
        }
        return this.ok(parsed);
    }
}
exports.CoreArgument = CoreArgument;
//# sourceMappingURL=CoreNumber.js.map