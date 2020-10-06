"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, privateMap) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to get private field on non-instance");
    }
    return privateMap.get(receiver);
};
var _lexer;
Object.defineProperty(exports, "__esModule", { value: true });
exports.Command = void 0;
const Lexure = __importStar(require("lexure"));
const Args_1 = require("../utils/Args");
const PreconditionContainer_1 = require("../utils/preconditions/PreconditionContainer");
const FlagUnorderedStrategy_1 = require("../utils/strategies/FlagUnorderedStrategy");
const BaseAliasPiece_1 = require("./base/BaseAliasPiece");
class Command extends BaseAliasPiece_1.BaseAliasPiece {
    /**
     * @since 1.0.0
     * @param context The context.
     * @param options Optional Command settings.
     */
    constructor(context, { name, ...options } = {}) {
        var _a, _b, _c, _d, _e;
        super(context, { ...options, name: (name !== null && name !== void 0 ? name : context.name).toLowerCase() });
        /**
         * The lexer to be used for command parsing
         * @since 1.0.0
         * @private
         */
        // eslint-disable-next-line @typescript-eslint/explicit-member-accessibility
        _lexer.set(this, new Lexure.Lexer());
        this.description = (_a = options.description) !== null && _a !== void 0 ? _a : '';
        this.detailedDescription = (_b = options.detailedDescription) !== null && _b !== void 0 ? _b : '';
        this.preconditions = new PreconditionContainer_1.PreconditionContainerAll(this.client, (_c = options.preconditions) !== null && _c !== void 0 ? _c : []);
        this.strategy = new FlagUnorderedStrategy_1.FlagUnorderedStrategy((_d = options.strategyOptions) !== null && _d !== void 0 ? _d : {});
        __classPrivateFieldGet(this, _lexer).setQuotes((_e = options.quotes) !== null && _e !== void 0 ? _e : [
            ['"', '"'],
            ['“', '”'],
            ['「', '」'] // Corner brackets (CJK)
        ]);
    }
    /**
     * The pre-parse method. This method can be overriden by plugins to define their own argument parser.
     * @param message The message that triggered the command.
     * @param parameters The raw parameters as a single string.
     */
    preParse(message, parameters) {
        const parser = new Lexure.Parser(__classPrivateFieldGet(this, _lexer).setInput(parameters).lex()).setUnorderedStrategy(this.strategy);
        const args = new Lexure.Args(parser.parse());
        return new Args_1.Args(message, this, args);
    }
    /**
     * Defines the JSON.stringify behavior of the command.
     */
    toJSON() {
        return {
            ...super.toJSON(),
            description: this.description,
            detailedDescription: this.detailedDescription,
            strategy: this.strategy
        };
    }
}
exports.Command = Command;
_lexer = new WeakMap();
//# sourceMappingURL=Command.js.map