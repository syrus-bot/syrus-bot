"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.enumerableMethod = exports.enumerable = exports.ApplyOptions = void 0;
const utils_1 = require("./utils");
/**
 * Decorator function that applies given options to any Klasa piece
 *
 * ```ts
 *	ApplyOptions<CommandOptions>({
 *		name: 'test',
 *		cooldown: 10
 *	})
 *	export default class extends Command {}
 * ```
 * @since 1.0.0
 * @param options The options to pass to the piece constructor
 */
function ApplyOptions(optionsOrFn) {
    return utils_1.createClassDecorator((target) => utils_1.createProxy(target, {
        construct: (ctor, [context, baseOptions = {}]) => new ctor(context, {
            ...baseOptions,
            ...(typeof optionsOrFn === 'function' ? optionsOrFn(context.client) : optionsOrFn)
        })
    }));
}
exports.ApplyOptions = ApplyOptions;
/**
 * Decorator that sets the enumerable property of a class field to the desired value.
 * @param value Whether the property should be enumerable or not
 */
function enumerable(value) {
    return (target, key) => {
        // eslint-disable-next-line @typescript-eslint/ban-types
        Reflect.defineProperty(target, key, {
            enumerable: value,
            set(val) {
                // eslint-disable-next-line @typescript-eslint/ban-types
                Reflect.defineProperty(this, key, {
                    configurable: true,
                    enumerable: value,
                    value: val,
                    writable: true
                });
            }
        });
    };
}
exports.enumerable = enumerable;
/**
 * Decorator that sets the enumerable property of a class method to the desired value.
 * @param value Whether the metthod should be enumerable or not
 */
function enumerableMethod(value) {
    return utils_1.createMethodDecorator((_target, _propertyKey, descriptor) => {
        descriptor.enumerable = value;
    });
}
exports.enumerableMethod = enumerableMethod;
//# sourceMappingURL=core-decorators.js.map