/**
 * A type used to express computations that can fail.
 * @typeparam T The result's type.
 * @typeparam E The error's type.
 */
export declare type Result<T, E> = Ok<T> | Err<E>;
/**
 * The computation is successful.
 * @typeparam T Type of results.
 */
export interface Ok<T> {
    /**
     * Whether or not the result was successful, always true in Ok<T>.
     */
    readonly success: true;
    /**
     * The resulting value, defined only in Ok<T>.
     */
    readonly value: T;
}
/**
 * The computation failed.
 * @typeparam E Type of errors.
 */
export interface Err<E> {
    /**
     * Whether or not the result was successful, always false in Err<E>.
     */
    readonly success: false;
    /**
     * The resulting error, defined only in Err<E>.
     */
    readonly error: E;
}
/**
 * Creates an Ok with no value.
 * @return A successful Result.
 */
export declare function ok(): Ok<unknown>;
/**
 * Creates an Ok.
 * @typeparam T The result's type.
 * @param x Value to use.
 * @return A successful Result.
 */
export declare function ok<T>(x: T): Ok<T>;
/**
 * Creates an Err with no error.
 * @return An erroneous Result.
 */
export declare function err(): Err<unknown>;
/**
 * Creates an Err.
 * @typeparam E The error's type.
 * @param x Value to use.
 * @return An erroneous Result.
 */
export declare function err<E>(x: E): Err<E>;
/**
 * Determines whether or not a result is an Ok.
 * @typeparam T The result's type.
 * @typeparam E The error's type.
 */
export declare function isOk<T, E>(x: Result<T, E>): x is Ok<T>;
/**
 * Determines whether or not a result is an Err.
 * @typeparam T The result's type.
 * @typeparam E The error's type.
 */
export declare function isErr<T, E>(x: Result<T, E>): x is Err<E>;
//# sourceMappingURL=Result.d.ts.map