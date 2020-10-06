import type { SapphireClient } from '@sapphire/framework';
import type { PieceOptions } from '@sapphire/pieces';
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
export declare function ApplyOptions<T extends PieceOptions>(optionsOrFn: T | ((client: SapphireClient) => T)): ClassDecorator;
/**
 * Decorator that sets the enumerable property of a class field to the desired value.
 * @param value Whether the property should be enumerable or not
 */
export declare function enumerable(value: boolean): (target: unknown, key: string) => void;
/**
 * Decorator that sets the enumerable property of a class method to the desired value.
 * @param value Whether the metthod should be enumerable or not
 */
export declare function enumerableMethod(value: boolean): MethodDecorator;
//# sourceMappingURL=core-decorators.d.ts.map