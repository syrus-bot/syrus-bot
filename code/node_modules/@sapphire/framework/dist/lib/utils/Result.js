"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isErr = exports.isOk = exports.err = exports.ok = void 0;
function ok(x) {
    return { success: true, value: x };
}
exports.ok = ok;
function err(x) {
    return { success: false, error: x };
}
exports.err = err;
/**
 * Determines whether or not a result is an Ok.
 * @typeparam T The result's type.
 * @typeparam E The error's type.
 */
function isOk(x) {
    return x.success;
}
exports.isOk = isOk;
/**
 * Determines whether or not a result is an Err.
 * @typeparam T The result's type.
 * @typeparam E The error's type.
 */
function isErr(x) {
    return !x.success;
}
exports.isErr = isErr;
//# sourceMappingURL=Result.js.map