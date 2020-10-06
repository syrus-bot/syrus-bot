"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoadSingle = void 0;
const MissingExportsError_1 = require("../../errors/MissingExportsError");
const Shared_1 = require("../Shared");
/**
 * The single loader. This loader is the default and returns the first loaded class.
 */
exports.LoadSingle = {
    async *load(store, path) {
        const result = await store.preloadHook(path);
        // Support `module.exports`:
        if (Shared_1.isClass(result) && Shared_1.classExtends(result, store.Constructor))
            return yield result;
        // Support any other export:
        for (const value of Object.values(result)) {
            if (Shared_1.isClass(value) && Shared_1.classExtends(value, store.Constructor))
                return yield value;
        }
        throw new MissingExportsError_1.MissingExportsError(path);
    }
};
//# sourceMappingURL=LoadSingle.js.map