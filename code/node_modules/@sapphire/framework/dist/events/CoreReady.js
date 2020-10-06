"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CoreEvent = void 0;
const Event_1 = require("../lib/structures/Event");
const Events_1 = require("../lib/types/Events");
class CoreEvent extends Event_1.Event {
    constructor(context) {
        super(context, { event: Events_1.Events.Ready, once: true });
    }
    run() {
        var _a, _b;
        if (!this.client.id)
            this.client.id = (_b = (_a = this.client.user) === null || _a === void 0 ? void 0 : _a.id) !== null && _b !== void 0 ? _b : null;
    }
}
exports.CoreEvent = CoreEvent;
//# sourceMappingURL=CoreReady.js.map