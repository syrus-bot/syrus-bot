"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CoreEvent = void 0;
const Event_1 = require("../../lib/structures/Event");
const Events_1 = require("../../lib/types/Events");
const Result_1 = require("../../lib/utils/Result");
class CoreEvent extends Event_1.Event {
    constructor(context) {
        super(context, { event: Events_1.Events.PreCommandRun });
    }
    async run(message, command, parameters, commandName, prefix) {
        const result = await command.preconditions.run(message, command);
        if (Result_1.isErr(result)) {
            this.client.emit(Events_1.Events.CommandDenied, message, command, parameters, commandName, prefix);
        }
        else {
            this.client.emit(Events_1.Events.CommandAccepted, message, command, parameters, commandName, prefix);
        }
    }
}
exports.CoreEvent = CoreEvent;
//# sourceMappingURL=CorePreCommandRun.js.map