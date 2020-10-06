"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createProxy = exports.createClassDecorator = exports.createMethodDecorator = void 0;
/**
 * Utility to make a method decorator with lighter syntax and inferred types.
 *
 * ```ts
 * // Enumerable function
 *	function enumerableMethod(value: boolean) {
 *		return createMethodDecorator((_target, _propertyKey, descriptor) => {
 *			descriptor.enumerable = value;
 *		});
 *	}
 * ```
 * @since 1.0.0
 * @param fn The method to decorate
 */
function createMethodDecorator(fn) {
    return fn;
}
exports.createMethodDecorator = createMethodDecorator;
/**
 * Utility to make a class decorator with lighter syntax and inferred types.
 * @since 1.0.0
 * @param fn The class to decorate
 * @see {@link ApplyOptions}
 */
function createClassDecorator(fn) {
    return fn;
}
exports.createClassDecorator = createClassDecorator;
/**
 * Creates a new proxy to efficiently add properties to class without creating subclasses
 * @param target The constructor of the class to modify
 * @param handler The handler function to modify the constructor behavior for the target
 * @hidden
 */
// eslint-disable-next-line @typescript-eslint/ban-types
function createProxy(target, handler) {
    return new Proxy(target, {
        ...handler,
        get: (target, property) => {
            const value = Reflect.get(target, property);
            return typeof value === 'function' ? (...args) => value.apply(target, args) : value;
        }
    });
}
exports.createProxy = createProxy;
//# sourceMappingURL=utils.js.map