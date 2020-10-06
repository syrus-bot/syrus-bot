"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CoreEvent = void 0;
const discord_js_1 = require("discord.js");
const Event_1 = require("../../lib/structures/Event");
const Events_1 = require("../../lib/types/Events");
class CoreEvent extends Event_1.Event {
    constructor(context) {
        super(context, { event: Events_1.Events.Message });
        this.requiredPermissions = new discord_js_1.Permissions(['VIEW_CHANNEL', 'SEND_MESSAGES']).freeze();
    }
    async run(message) {
        // Stop bots and webhooks from running commands.
        if (message.author.bot || message.webhookID)
            return;
        // If the bot cannot run the command due to lack of permissions, return.
        const canRun = await this.canRunInChannel(message);
        if (!canRun)
            return;
        let prefix = '';
        const mentionPrefix = this.getMentionPrefix(message.content);
        if (mentionPrefix) {
            if (message.content.length === mentionPrefix.length) {
                this.client.emit(Events_1.Events.MentionPrefixOnly, message);
                return;
            }
            prefix = mentionPrefix;
        }
        else {
            const prefixes = await this.client.fetchPrefix(message);
            const parsed = this.getPrefix(message.content, prefixes);
            if (parsed !== null)
                prefix = parsed;
        }
        if (prefix)
            this.client.emit(Events_1.Events.PrefixedMessage, message, prefix);
    }
    async canRunInChannel(message) {
        var _a;
        if (message.channel.type === 'dm')
            return true;
        const me = (_a = message.guild.me) !== null && _a !== void 0 ? _a : (this.client.id ? await message.guild.members.fetch(this.client.id) : null);
        if (!me)
            return false;
        const channel = message.channel;
        return channel.permissionsFor(me).has(this.requiredPermissions, false);
    }
    getMentionPrefix(content) {
        // If no client ID was specified, return null:
        if (!this.client.id)
            return null;
        // If the content is shorter than `<@{n}>` or doesn't start with `<@`, skip early:
        if (content.length < 20 || !content.startsWith('<@'))
            return null;
        // Retrieve whether the mention is a nickname mention (`<@!{n}>`) or not (`<@{n}>`).
        const nickname = content[2] === '!';
        const idOffset = (nickname ? 3 : 2);
        const idLength = this.client.id.length;
        // If the mention doesn't end with `>`, skip early:
        if (content[idOffset + idLength] !== '>')
            return null;
        // Check whether or not the ID is the same as the client ID:
        const mentionID = content.substr(idOffset, idLength);
        if (mentionID === this.client.id)
            return content.substr(0, idOffset + idLength + 1);
        return null;
    }
    getPrefix(content, prefixes) {
        var _a;
        if (prefixes === null)
            return null;
        if (typeof prefixes === 'string')
            return content.startsWith(prefixes) ? prefixes : null;
        return (_a = prefixes.find((prefix) => content.startsWith(prefix))) !== null && _a !== void 0 ? _a : null;
    }
}
exports.CoreEvent = CoreEvent;
//# sourceMappingURL=CoreMessageParser.js.map