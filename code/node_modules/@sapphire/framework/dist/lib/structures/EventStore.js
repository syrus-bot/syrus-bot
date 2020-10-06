"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventStore = void 0;
const BaseStore_1 = require("./base/BaseStore");
const Event_1 = require("./Event");
class EventStore extends BaseStore_1.BaseStore {
    constructor(client) {
        super(client, Event_1.Event, { name: 'events' });
    }
}
exports.EventStore = EventStore;
//# sourceMappingURL=EventStore.js.map