const { Monitor } = require('klasa');

module.exports = class extends Monitor {

    constructor(...args) {
        super(...args, {
            name: 'clientMention',
            enabled: true,
            ignoreBots: true,
            ignoreSelf: true,
            ignoreOthers: true,
            ignoreWebhooks: true,
            ignoreEdits: true,
            ignoreBlacklistedUsers: true,
            ignoreBlacklistedGuilds: true
        });
    }

    run(message) {
    }

    async init() {

    }

};