const { Structures } = require('discord.js');
const MusicManager = require('../structures/musicManager');

module.exports = Structures.extend('Guild', Guild => {
	class syrusGuild extends Guild {
		constructor(...args) {
			super(...args);
			this.music = new MusicManager(this);
		}
	}
	return syrusGuild;
});