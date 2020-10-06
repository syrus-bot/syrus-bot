export declare type Primitive = string | number | boolean | bigint | symbol | undefined | null;
export declare type Builtin = Primitive | Function | Date | Error | RegExp;
export declare type DeepRequired<T> = T extends Builtin ? NonNullable<T> : T extends Map<infer K, infer V> ? Map<DeepRequired<K>, DeepRequired<V>> : T extends ReadonlyMap<infer K, infer V> ? ReadonlyMap<DeepRequired<K>, DeepRequired<V>> : T extends WeakMap<infer K, infer V> ? WeakMap<DeepRequired<K>, DeepRequired<V>> : T extends Set<infer U> ? Set<DeepRequired<U>> : T extends ReadonlySet<infer U> ? ReadonlySet<DeepRequired<U>> : T extends WeakSet<infer U> ? WeakSet<DeepRequired<U>> : T extends Promise<infer U> ? Promise<DeepRequired<U>> : T extends {} ? {
    [K in keyof T]-?: DeepRequired<T[K]>;
} : NonNullable<T>;
export declare type RequiredExcept<T, K extends keyof T> = Partial<Pick<T, K>> & Required<Omit<T, K>>;
export declare type PartialRequired<T, K extends keyof T> = Partial<Omit<T, K>> & Required<Pick<T, K>>;
export declare type DeepPartial<T> = {
    [P in keyof T]?: T[P] extends Array<infer U> ? Array<DeepPartial<U>> : T[P] extends ReadonlyArray<infer U> ? ReadonlyArray<DeepPartial<U>> : DeepPartial<T[P]>;
};
export declare type ArgumentTypes<F extends (...args: any[]) => unknown> = F extends (...args: infer A) => any ? A : never;
/**
 * A readonly array of any values.
 * @private
 */
export declare type Arr = readonly any[];
/**
 * A generic constructor with parameters
 */
export declare type Ctor<A extends Arr = readonly any[], R = any> = new (...args: A) => R;
/**
 * A generic constructor without parameters
 */
export declare type Constructor<T> = new (...args: any[]) => T;
/**
 * Gets the first argument of any given function
 */
export declare type FirstArgument<T> = T extends (arg1: infer U, ...args: unknown[]) => unknown ? U : unknown;
/**
 * Gets the second argument of any given function
 */
export declare type SecondArgument<T> = T extends (arg1: unknown, arg2: infer U, ...args: unknown[]) => unknown ? U : unknown;
/**
 * ReturnType for a function that can return either a value or a `Promise` with that value
 */
export declare type Awaited<T> = PromiseLike<T> | T;
//# sourceMappingURL=utilityTypes.d.ts.map