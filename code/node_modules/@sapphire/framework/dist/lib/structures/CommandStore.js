"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommandStore = void 0;
const BaseAliasStore_1 = require("./base/BaseAliasStore");
const Command_1 = require("./Command");
/**
 * Stores all Command pieces
 * @since 1.0.0
 */
class CommandStore extends BaseAliasStore_1.BaseAliasStore {
    constructor(client) {
        super(client, Command_1.Command, { name: 'commands' });
    }
}
exports.CommandStore = CommandStore;
//# sourceMappingURL=CommandStore.js.map