"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRootDirectory = void 0;
const fs_1 = require("fs");
const path_1 = require("path");
function getProcessMainModule() {
    var _a;
    return (_a = Reflect.get(process, 'mainModule')) === null || _a === void 0 ? void 0 : _a.path;
}
function getRequireMain() {
    var _a;
    return (_a = require.main) === null || _a === void 0 ? void 0 : _a.path;
}
function getPackageMain() {
    const cwd = process.cwd();
    try {
        const file = fs_1.readFileSync(path_1.join(cwd, 'package.json'), 'utf8');
        return path_1.dirname(path_1.join(cwd, JSON.parse(file).main));
    }
    catch {
        return undefined;
    }
}
function getProcessCwd() {
    return process.cwd();
}
let path = null;
function getRootDirectory() {
    var _a, _b, _c;
    if (path === null)
        path = (_c = (_b = (_a = getProcessMainModule()) !== null && _a !== void 0 ? _a : getRequireMain()) !== null && _b !== void 0 ? _b : getPackageMain()) !== null && _c !== void 0 ? _c : getProcessCwd();
    return path;
}
exports.getRootDirectory = getRootDirectory;
//# sourceMappingURL=RootDir.js.map