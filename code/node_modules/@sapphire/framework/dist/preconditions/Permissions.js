"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CorePrecondition = void 0;
const discord_js_1 = require("discord.js");
const Precondition_1 = require("../lib/structures/Precondition");
class CorePrecondition extends Precondition_1.Precondition {
    constructor() {
        super(...arguments);
        this.dmChannelPermissions = new discord_js_1.Permissions([
            discord_js_1.Permissions.FLAGS.VIEW_CHANNEL,
            discord_js_1.Permissions.FLAGS.SEND_MESSAGES,
            discord_js_1.Permissions.FLAGS.SEND_TTS_MESSAGES,
            discord_js_1.Permissions.FLAGS.EMBED_LINKS,
            discord_js_1.Permissions.FLAGS.ATTACH_FILES,
            discord_js_1.Permissions.FLAGS.READ_MESSAGE_HISTORY,
            discord_js_1.Permissions.FLAGS.MENTION_EVERYONE,
            discord_js_1.Permissions.FLAGS.USE_EXTERNAL_EMOJIS,
            discord_js_1.Permissions.FLAGS.ADD_REACTIONS
        ]).freeze();
    }
    run(message, _command, context) {
        var _a;
        const required = (_a = context.permissions) !== null && _a !== void 0 ? _a : new discord_js_1.Permissions(0);
        const permissions = message.guild
            ? message.channel.permissionsFor(this.client.id)
            : this.dmChannelPermissions;
        const missing = permissions.missing(required);
        return missing.length === 0 ? this.ok() : this.error(this.name, 'I am missing permissions to run this command.', missing);
    }
}
exports.CorePrecondition = CorePrecondition;
//# sourceMappingURL=Permissions.js.map