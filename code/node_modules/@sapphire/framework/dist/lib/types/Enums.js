"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PluginHook = exports.CooldownLevel = void 0;
var CooldownLevel;
(function (CooldownLevel) {
    CooldownLevel["Author"] = "author";
    CooldownLevel["Channel"] = "channel";
    CooldownLevel["Guild"] = "guild";
})(CooldownLevel = exports.CooldownLevel || (exports.CooldownLevel = {}));
var PluginHook;
(function (PluginHook) {
    PluginHook["PreGenericsInitialization"] = "preGenericsInitialization";
    PluginHook["PreInitialization"] = "preInitialization";
    PluginHook["PostInitialization"] = "postInitialization";
    PluginHook["PreLogin"] = "preLogin";
    PluginHook["PostLogin"] = "postLogin";
})(PluginHook = exports.PluginHook || (exports.PluginHook = {}));
//# sourceMappingURL=Enums.js.map