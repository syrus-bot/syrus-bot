const { Event } = require('@sapphire/framework');

module.exports = class denyEvent extends Event {
	constructor(context) {
		super(context, {
			once: false,
			event: 'commandDenied'
		});
	}

	async run(msg, cmd, params, cmdname, prefix) {
        await msg.sendTranslated('global:commerr.denied', [{
            cmd: cmdname
        }]);
	}
};