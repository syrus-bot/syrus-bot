"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CoreArgument = void 0;
const url_1 = require("url");
const Argument_1 = require("../lib/structures/Argument");
class CoreArgument extends Argument_1.Argument {
    constructor(context) {
        super(context, { name: 'hyperlink', aliases: ['url'] });
    }
    run(argument) {
        try {
            return this.ok(new url_1.URL(argument));
        }
        catch {
            return this.error(argument, 'ArgumentHyperlinkInvalidURL', 'The argument did not resolve to a valid URL.');
        }
    }
}
exports.CoreArgument = CoreArgument;
//# sourceMappingURL=CoreHyperlink.js.map