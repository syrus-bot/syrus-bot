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
export declare function createMethodDecorator(fn: MethodDecorator): MethodDecorator;
/**
 * Utility to make a class decorator with lighter syntax and inferred types.
 * @since 1.0.0
 * @param fn The class to decorate
 * @see {@link ApplyOptions}
 */
export declare function createClassDecorator<TFunction extends (...args: any[]) => void>(fn: TFunction): ClassDecorator;
/**
 * Creates a new proxy to efficiently add properties to class without creating subclasses
 * @param target The constructor of the class to modify
 * @param handler The handler function to modify the constructor behavior for the target
 * @hidden
 */
export declare function createProxy<T extends object>(target: T, handler: Omit<ProxyHandler<T>, 'get'>): T;
//# sourceMappingURL=utils.d.ts.map