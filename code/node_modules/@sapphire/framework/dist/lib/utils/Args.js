"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Args = void 0;
const ArgumentError_1 = require("../errors/ArgumentError");
const UserError_1 = require("../errors/UserError");
const Result_1 = require("./Result");
/**
 * The argument parser to be used in [[Command]].
 */
class Args {
    constructor(message, command, parser) {
        this.states = [];
        this.message = message;
        this.command = command;
        this.parser = parser;
    }
    /**
     * Sets the parser to the first token.
     */
    start() {
        this.parser.state = {
            usedIndices: new Set(),
            position: 0,
            positionFromEnd: this.parser.parserOutput.ordered.length - 1
        };
        return this;
    }
    async pickResult(type, options = {}) {
        const argument = this.resolveArgument(type);
        if (!argument)
            return Result_1.err(new UserError_1.UserError('UnavailableArgument', `The argument "${type}" was not found.`));
        const result = await this.parser.singleParseAsync(async (arg) => argument.run(arg, {
            message: this.message,
            command: this.command,
            ...options
        }));
        if (result === null)
            return Result_1.err(new UserError_1.UserError('MissingArguments', 'There are no more arguments.'));
        if (Result_1.isOk(result))
            return result;
        return result;
    }
    async pick(type, options) {
        const result = await this.pickResult(type, options);
        if (Result_1.isOk(result))
            return result.value;
        throw result.error;
    }
    async restResult(type, options = {}) {
        const argument = this.resolveArgument(type);
        if (!argument)
            return Result_1.err(new UserError_1.UserError('UnavailableArgument', `The argument "${type}" was not found.`));
        if (this.parser.finished)
            return Result_1.err(new UserError_1.UserError('MissingArguments', 'There are no more arguments.'));
        const state = this.parser.save();
        const data = this.parser.many().reduce((acc, token) => `${acc}${token.value}${token.trailing}`, '');
        const result = await argument.run(data, {
            message: this.message,
            command: this.command,
            ...options
        });
        if (Result_1.isOk(result))
            return result;
        this.parser.restore(state);
        return result;
    }
    async rest(type, options) {
        const result = await this.restResult(type, options);
        if (Result_1.isOk(result))
            return result.value;
        throw result.error;
    }
    async repeatResult(type, options = {}) {
        var _a;
        const argument = this.resolveArgument(type);
        if (!argument)
            return Result_1.err(new UserError_1.UserError('UnavailableArgument', `The argument "${type}" was not found.`));
        if (this.parser.finished)
            return Result_1.err(new UserError_1.UserError('MissingArguments', 'There are no more arguments.'));
        const output = [];
        for (let i = 0, times = (_a = options.times) !== null && _a !== void 0 ? _a : Infinity; i < times; i++) {
            const result = await this.parser.singleParseAsync(async (arg) => argument.run(arg, {
                message: this.message,
                command: this.command,
                ...options
            }));
            if (result === null)
                break;
            if (Result_1.isErr(result)) {
                if (output.length === 0)
                    return result;
                break;
            }
            output.push(result.value);
        }
        return Result_1.ok(output);
    }
    async repeat(type, options) {
        const result = await this.repeatResult(type, options);
        if (Result_1.isOk(result))
            return result.value;
        throw result.error;
    }
    /**
     * Checks if one or more flag were given.
     * @param keys The name(s) of the flag.
     * @example
     * ```ts
     * // Suppose args are from '--f --g'.
     * console.log(args.getFlags('f'));
     * >>> true
     *
     * console.log(args.getFlags('g', 'h'));
     * >>> true
     *
     * console.log(args.getFlags('h'));
     * >>> false
     * ```
     */
    getFlags(...keys) {
        return this.parser.flag(...keys);
    }
    /**
     * Gets the last value of one or more options.
     * @param keys The name(s) of the option.
     * @example
     * ```ts
     * // Suppose args are from '--a=1 --b=2 --c=3'.
     * console.log(args.getOption('a'));
     * >>> '1'
     *
     * console.log(args.getOption('b', 'c'));
     * >>> '2'
     *
     * console.log(args.getOption('d'));
     * >>> null
     * ```
     */
    getOption(...keys) {
        return this.parser.option(...keys);
    }
    /**
     * Gets all the values of one or more option.
     * @param keys The name(s) of the option.
     * @example
     * ```ts
     * // Suppose args are from '--a=1 --a=1 --b=2 --c=3'.
     * console.log(args.getOptions('a'));
     * >>> ['1', '1']
     *
     * console.log(args.getOptions('b', 'c'));
     * >>> ['2', '3']
     *
     * console.log(args.getOptions('d'));
     * >>> null
     * ```
     */
    getOptions(...keys) {
        return this.parser.options(...keys);
    }
    /**
     * Saves the current state into the stack following a FILO strategy (first-in, last-out).
     * @seealso [[Args.restore]]
     */
    save() {
        this.states.push(this.parser.save());
    }
    /**
     * Restores the previously saved state from the stack.
     * @seealso [[Args.save]]
     */
    restore() {
        if (this.states.length !== 0)
            this.parser.restore(this.states.pop());
    }
    /**
     * Resolves an argument.
     * @param arg The argument name or [[IArgument]] instance.
     */
    resolveArgument(arg) {
        if (typeof arg === 'object')
            return arg;
        return this.message.client.arguments.get(arg);
    }
    /**
     * Converts a callback into an usable argument.
     * @param cb The callback to convert into an [[IArgument]].
     */
    static make(cb, name = '') {
        return { run: cb, name };
    }
    static error(argument, parameter, typeOrMessage, rawMessage) {
        const [type, message] = typeof rawMessage === 'undefined' ? [argument.name, typeOrMessage] : [typeOrMessage, rawMessage];
        return new ArgumentError_1.ArgumentError(argument, parameter, type, message);
    }
}
exports.Args = Args;
//# sourceMappingURL=Args.js.map