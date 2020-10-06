"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Internationalization = void 0;
class Internationalization {
    constructor(defaultName) {
        this.defaultName = defaultName;
    }
    resolveNameFromMessage(message) {
        var _a, _b;
        return (_b = (_a = message.guild) === null || _a === void 0 ? void 0 : _a.preferredLocale) !== null && _b !== void 0 ? _b : this.defaultName;
    }
    resolveValue() {
        throw new TypeError('The base Internationalization may not be used. Please refer to using a plugin or use your own implementation.');
    }
}
exports.Internationalization = Internationalization;
//# sourceMappingURL=Internationalization.js.map