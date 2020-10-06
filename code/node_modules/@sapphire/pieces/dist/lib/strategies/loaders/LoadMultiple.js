"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoadMultiple = void 0;
const MissingExportsError_1 = require("../../errors/MissingExportsError");
const Shared_1 = require("../Shared");
/**
 * The multi-loader. This loader can load multiple classes from a module
 * into the store. The catch is that you must specify the name for each
 * piece.
 */
exports.LoadMultiple = {
    async *load(store, path) {
        let yielded = false;
        const result = await store.preloadHook(path);
        // Support `module.exports`:
        if (Shared_1.isClass(result) && Shared_1.classExtends(result, store.Constructor)) {
            yield result;
            yielded = true;
        }
        // Support any other export:
        for (const value of Object.values(result)) {
            if (Shared_1.isClass(value) && Shared_1.classExtends(value, store.Constructor)) {
                yield value;
                yielded = true;
            }
        }
        if (!yielded) {
            throw new MissingExportsError_1.MissingExportsError(path);
        }
    }
};
//# sourceMappingURL=LoadMultiple.js.map