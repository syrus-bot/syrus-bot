"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PreconditionContainerAll = void 0;
const Result_1 = require("../Result");
const PreconditionContainerAny_1 = require("./PreconditionContainerAny");
class PreconditionContainerAll extends PreconditionContainerAny_1.PreconditionContainerAny {
    async runSequential(message, command) {
        for (const child of this.entries) {
            const result = await child.run(message, command);
            if (Result_1.isErr(result))
                return result;
        }
        return Result_1.ok();
    }
    async runParallel(message, command) {
        var _a;
        const results = await Promise.all(this.entries.map((entry) => entry.run(message, command)));
        // This is simplified compared to PreconditionContainerAny because we're looking for the first error.
        // However, the base implementation short-circuits with the first Ok.
        return (_a = results.find(Result_1.isErr)) !== null && _a !== void 0 ? _a : Result_1.ok();
    }
}
exports.PreconditionContainerAll = PreconditionContainerAll;
//# sourceMappingURL=PreconditionContainer.js.map