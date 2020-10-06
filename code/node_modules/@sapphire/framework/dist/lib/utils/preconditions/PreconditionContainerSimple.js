"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PreconditionContainerSingle = void 0;
class PreconditionContainerSingle {
    constructor(client, data) {
        this.client = client;
        if (typeof data === 'string') {
            this.context = {};
            this.entry = data;
        }
        else {
            this.context = data.context;
            this.entry = data.entry;
        }
    }
    get precondition() {
        const precondition = this.client.preconditions.get(this.entry);
        if (precondition)
            return precondition;
        throw new Error(`The precondition ${this.entry} is not available.`);
    }
    run(message, command) {
        return this.precondition.run(message, command, this.context);
    }
}
exports.PreconditionContainerSingle = PreconditionContainerSingle;
//# sourceMappingURL=PreconditionContainerSimple.js.map