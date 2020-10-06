"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FlagUnorderedStrategy = void 0;
class FlagUnorderedStrategy {
    constructor({ flags = [], options = [], prefixes = ['--', '-', '—'], separators = ['=', ':'] } = {}) {
        this.flags = flags;
        this.options = options;
        this.prefixes = prefixes;
        this.separators = separators;
    }
    matchFlag(s) {
        const prefix = this.prefixes.find((p) => s.startsWith(p));
        if (!prefix)
            return null;
        s = s.slice(prefix.length);
        // Flags must not contain separators.
        if (this.separators.some((p) => s.includes(p)))
            return null;
        // The flag must be an allowed one.
        if (this.flags.includes(s))
            return s;
        // If it did not match a flag, return null.
        return null;
    }
    matchOption(s) {
        const prefix = this.prefixes.find((p) => s.startsWith(p));
        if (!prefix)
            return null;
        s = s.slice(prefix.length);
        const separator = this.separators.find((p) => s.endsWith(p));
        if (!separator)
            return null;
        s = s.slice(0, -separator.length);
        if (this.options.includes(s))
            return s;
        return null;
    }
    matchCompactOption(s) {
        const pre = this.prefixes.find((x) => s.startsWith(x));
        if (!pre)
            return null;
        s = s.slice(pre.length);
        const sep = this.separators.find((x) => s.includes(x));
        if (!sep)
            return null;
        const i = s.indexOf(sep);
        if (i + sep.length === s.length)
            return null;
        const k = s.slice(0, i);
        if (!this.options.includes(k))
            return null;
        const v = s.slice(i + sep.length);
        return [k, v];
    }
}
exports.FlagUnorderedStrategy = FlagUnorderedStrategy;
//# sourceMappingURL=FlagUnorderedStrategy.js.map