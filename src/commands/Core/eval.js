const SyrusCommand = require("../../lib/structures/SyrusCommand");
const util = require("util");

module.exports = class ClientCommand extends SyrusCommand {
	constructor(context) {
		super(context, {
			name: "eval",
			description: "core:eval.description",
			aliases: ["ev"],
			preconditions: ["Owner"],
			quotes: []
		});
	}

	async run(message, args) {
		const token = this.client.token.split("");
		const tokenRegex = new RegExp(
			`${token.join("[^]{0,2}")}|${token.reverse().join("[^]{0,2}")}`
		);

		function clean(text) {
			if (typeof text === "string") {
				return text.replace(/`/g, `\`${String.fromCharCode(8203)}`).replace(/@/g, `@${String.fromCharCode(8203)}`)
					.replace(tokenRegex, "[TOKEN]");
			}
			return text;
		}

		try {
			const code = await args.restResult("string");
			let timer;
			const wrappedEval = performance.timerify(() => {
				return eval(code.value);
			});
			const observer = new PerformanceObserver((list) => {
				timer = list.getEntries()[0].duration;
				observer.disconnect();
			});
			observer.observe({entryTypes: ["function"]});
			const evaled = wrappedEval();
			const result = clean(util.inspect(evaled));
			message.channel
				.send(
					`\`\`\`js\n${result}\n\`\`\`\n\u23F1 ${timer}ms`
				)
				.catch(() => {
					message.channel.send(
						"`OUTPUT WAS TOO LONG TO DISPLAY IN DISCORD, "
						+ "REDIRECTING TO CONSOLE.`"
					);
					console.log(evaled);
				});
		} catch (err) {
			message.channel.send(`\`ERROR\` \`\`\`js\n${clean(err)}\n\`\`\``);
		}
	}
};
