"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CoreArgument = void 0;
const Argument_1 = require("../lib/structures/Argument");
class CoreArgument extends Argument_1.Argument {
    constructor(context) {
        super(context, { name: 'date' });
    }
    run(argument, context) {
        const parsed = new Date(argument);
        const time = parsed.getTime();
        if (Number.isNaN(time)) {
            return this.error(argument, 'ArgumentDateInvalidNumber', 'The argument did not resolve to a valid date.');
        }
        if (typeof context.minimum === 'number' && time < context.minimum) {
            return this.error(argument, 'ArgumentDateTooSmall', 'The argument is too small.');
        }
        if (typeof context.maximum === 'number' && time > context.maximum) {
            return this.error(argument, 'ArgumentDateTooBig', 'The argument is too big.');
        }
        return this.ok(parsed);
    }
}
exports.CoreArgument = CoreArgument;
//# sourceMappingURL=CoreDate.js.map