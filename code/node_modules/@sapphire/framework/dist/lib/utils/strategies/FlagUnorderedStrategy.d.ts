import type { UnorderedStrategy } from 'lexure';
/**
 * The strategy options used in Sapphire.
 */
export interface FlagStrategyOptions {
    /**
     * The accepted flags. Flags are key-value identifiers that can be placed anywhere in the command.
     * @default []
     */
    flags?: readonly string[];
    /**
     * The accepted options. Options are key-only identifiers that can be placed anywhere in the command.
     * @default []
     */
    options?: readonly string[];
    /**
     * The prefixes for both flags and options.
     * @default ['--', '-', '—']
     */
    prefixes?: string[];
    /**
     * The flag separators.
     * @default ['=', ':']
     */
    separators?: string[];
}
export declare class FlagUnorderedStrategy implements UnorderedStrategy {
    readonly flags: readonly string[];
    readonly options: readonly string[];
    readonly prefixes: readonly string[];
    readonly separators: readonly string[];
    constructor({ flags, options, prefixes, separators }?: FlagStrategyOptions);
    matchFlag(s: string): string | null;
    matchOption(s: string): string | null;
    matchCompactOption(s: string): [string, string] | null;
}
//# sourceMappingURL=FlagUnorderedStrategy.d.ts.map