const SyrusCommand = require("../../lib/structures/SyrusCommand");
const { Args, CommandOptions } = require("@sapphire/framework");
const util = require("util")

module.exports = class ClientCommand extends SyrusCommand {
	constructor(context) {
		super(context, {
			name: "eval",
			description: "core:eval.description",
			preconditions: ["owner"],
			quotes: []
		});
	}

	async run(message, args) {
		const tokenRegex = new RegExp(`${this.client.token.split("").join("[^]{0,2}")}|${this.client.token.split("").reverse()
			.join("[^]{0,2}")}`)
		function clean(text) {
			if (typeof text === "string") {
				return text.replace(/`/g, `\`${String.fromCharCode(8203)}`).replace(/@/g, `@${String.fromCharCode(8203)}`)
					.replace(tokenRegex, "[TOKEN]");
			}
			return text;

		}

		try {
			const code = await args.restResult("string");
			const evaled = util.inspect(eval(code.value));
			message.channel
				.send(clean(evaled), {code: "xl"})
				.catch(() => {
					message.channel.send(
						"`OUTPUT WAS TOO LONG TO DISPLAY IN DISCORD, "
						+ "REDIRECTING TO CONSOLE.`"
					);
					console.log(evaled);
				});
		} catch (err) {
			message.channel.send(`\`ERROR\` \`\`\`xl\n${clean(err)}\n\`\`\``);
		}

	}
}
