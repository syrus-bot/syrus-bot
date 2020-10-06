"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PreconditionContainerAny = void 0;
const Result_1 = require("../Result");
const PreconditionContainerSimple_1 = require("./PreconditionContainerSimple");
var PreconditionRunMode;
(function (PreconditionRunMode) {
    PreconditionRunMode["Sequential"] = "sequential";
    PreconditionRunMode["Parallel"] = "parallel";
})(PreconditionRunMode || (PreconditionRunMode = {}));
function isSingle(entry) {
    return typeof entry === 'string' || Reflect.has(entry, 'entry');
}
class PreconditionContainerAny {
    constructor(client, data) {
        this.entries = [];
        const [mode, entries] = PreconditionContainerAny.resolveData(data);
        this.mode = mode;
        for (const entry of entries) {
            this.entries.push(isSingle(entry) ? new PreconditionContainerSimple_1.PreconditionContainerSingle(client, entry) : new PreconditionContainerAny(client, entry));
        }
    }
    run(message, command) {
        return this.mode === "sequential" /* Sequential */ ? this.runSequential(message, command) : this.runParallel(message, command);
    }
    async runSequential(message, command) {
        let error = null;
        for (const child of this.entries) {
            const result = await child.run(message, command);
            if (Result_1.isOk(result))
                return result;
            error = result;
        }
        return error !== null && error !== void 0 ? error : Result_1.ok();
    }
    async runParallel(message, command) {
        const results = await Promise.all(this.entries.map((entry) => entry.run(message, command)));
        let error = null;
        for (const result of results) {
            if (Result_1.isOk(result))
                return result;
            error = result;
        }
        return error !== null && error !== void 0 ? error : Result_1.ok();
    }
    static resolveData(data) {
        if (Array.isArray(data))
            return ["sequential" /* Sequential */, data];
        const casted = data;
        return [casted.mode, casted.entries];
    }
}
exports.PreconditionContainerAny = PreconditionContainerAny;
//# sourceMappingURL=PreconditionContainerAny.js.map