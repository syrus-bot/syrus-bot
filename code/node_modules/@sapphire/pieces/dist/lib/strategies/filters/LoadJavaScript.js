"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoadJavaScript = void 0;
const path_1 = require("path");
/**
 * The JavaScript loader. This loader is the default and filters modules
 * by the `.js` extension.
 */
exports.LoadJavaScript = {
    getNameData(path) {
        // Retrieve the file extension.
        const extension = path_1.extname(path);
        if (extension !== '.js')
            return null;
        // Retrieve the name of the file, return null if empty.
        const name = path_1.basename(path, extension);
        if (name === '')
            return null;
        // Return the name and extension.
        return { extension, name };
    }
};
//# sourceMappingURL=LoadJavaScript.js.map