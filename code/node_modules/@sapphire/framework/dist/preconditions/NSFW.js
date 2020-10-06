"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CorePrecondition = void 0;
const Precondition_1 = require("../lib/structures/Precondition");
class CorePrecondition extends Precondition_1.Precondition {
    run(message) {
        // `nsfw` is undefined in DMChannel, doing `=== true`
        // will result on it returning`false`.
        return Reflect.get(message.channel, 'nsfw') === true
            ? this.ok()
            : this.error(this.name, 'You cannot run this command outside NSFW channels.');
    }
}
exports.CorePrecondition = CorePrecondition;
//# sourceMappingURL=NSFW.js.map