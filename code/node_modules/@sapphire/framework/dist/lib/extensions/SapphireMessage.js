"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SapphireMessage = void 0;
const discord_js_1 = require("discord.js");
class SapphireMessage extends discord_js_1.Structures.get('Message') {
    fetchLanguage() {
        return this.client.i18n.resolveNameFromMessage(this);
    }
    async fetchLanguageKey(key, ...values) {
        return this.client.i18n.resolveValue(await this.fetchLanguage(), key, ...values);
    }
    async sendTranslated(key, valuesOrOptions, rawOptions) {
        const [values, options] = typeof valuesOrOptions === 'undefined' || Array.isArray(valuesOrOptions)
            ? [valuesOrOptions !== null && valuesOrOptions !== void 0 ? valuesOrOptions : [], rawOptions !== null && rawOptions !== void 0 ? rawOptions : {}]
            : [[], valuesOrOptions];
        const content = await this.fetchLanguageKey(key, ...values);
        return this.channel.send(content, options);
    }
}
exports.SapphireMessage = SapphireMessage;
discord_js_1.Structures.extend('Message', () => SapphireMessage);
//# sourceMappingURL=SapphireMessage.js.map