/**
 * A readonly array of any values.
 * @private
 */
export declare type Arr = readonly any[];
/**
 * A generic constructor.
 * @private
 */
export declare type Ctor<A extends Arr = readonly any[], R = any> = new (...args: A) => R;
/**
 * Determines whether or not a value is a class.
 * @param value The piece to be checked.
 * @private
 */
export declare function isClass(value: unknown): value is Ctor;
/**
 * Checks whether or not the value class extends the base class.
 * @param value The constructor to be checked against.
 * @param base The base constructor.
 * @private
 */
export declare function classExtends<T extends Ctor>(value: Ctor, base: T): value is T;
//# sourceMappingURL=Shared.d.ts.map