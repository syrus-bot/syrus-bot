import type { DeepRequired } from './utilityTypes';
declare type NonNullObject = {};
/**
 * Sets default properties on an object that aren't already specified.
 * @since 0.5.0
 * @param def Default properties
 * @param given Object to assign defaults to
 */
export declare function mergeDefault<A extends NonNullObject, B extends Partial<A>>(defaults: A, given?: B): DeepRequired<A & B>;
export {};
//# sourceMappingURL=mergeDefault.d.ts.map