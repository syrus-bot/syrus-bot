"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CorePrecondition = void 0;
const Precondition_1 = require("../lib/structures/Precondition");
class CorePrecondition extends Precondition_1.Precondition {
    run(message) {
        return message.guild === null ? this.ok() : this.error(this.name, 'You cannot run this command outside DMs.');
    }
}
exports.CorePrecondition = CorePrecondition;
//# sourceMappingURL=DMOnly.js.map