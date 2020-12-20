const SyrusCommand = require("../../lib/structures/SyrusCommand");

module.exports = class ClientCommand extends SyrusCommand {
	constructor(context) {
		super(context, {
			name: "sus",
			description: "fun:sus.description"
		});
	}

	async run(message, args) {
		const member = await args.pickResult("member");
		const impostor = {
			0: {
				was: "wasn't",
				rem: "1 impostor remains"
			},
			1: {
				was: "was",
				rem: "0 impostors remain"
			}
		}[Math.floor(Math.random() * 2)];
		let disp;
		if (member.success) {
			disp = member.value.displayName;
		} else {
			disp = message.author.username;
		}
		message.channel.send(
			`
			.      　。　　　　•　    　ﾟ　　。
			　　.　　　.　　　  　　.　　　　　。　　   。　.
			 　.　　      。　        ඞ   。　    .    •
			 •                **${disp} ${impostor.was} The Impostor.**　 。　.
								  ${impostor.rem}
			　 　　。　　　　　　ﾟ　　　.　　　　　.
			,　　　　.　 .　　       .               。
			`
		);
	}
};
