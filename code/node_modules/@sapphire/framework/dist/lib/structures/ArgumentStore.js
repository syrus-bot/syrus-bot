"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ArgumentStore = void 0;
const Argument_1 = require("./Argument");
const BaseAliasStore_1 = require("./base/BaseAliasStore");
class ArgumentStore extends BaseAliasStore_1.BaseAliasStore {
    constructor(client) {
        super(client, Argument_1.Argument, { name: 'arguments' });
    }
}
exports.ArgumentStore = ArgumentStore;
//# sourceMappingURL=ArgumentStore.js.map