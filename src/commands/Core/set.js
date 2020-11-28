const SyrusCommand = require("../../lib/structures/SyrusCommand");
const { Args, CommandOptions } = require("@sapphire/framework");

module.exports = class ClientCommand extends SyrusCommand {
	constructor(context) {
		super(context, {
			name: "set",
			description: "core:set.description",
			preconditions: ["GuildOnly", "serverowner"]
		});
	}

	async run(message, args) {
		const guild = await message.client.settings.guild(message.guild.id);
		const key = await args.pickResult("string");
		const val = await args.repeatResult("string");

		if (key.value && val.value) {
			guild.set(key.value, val.value.join(" "));
			await guild.save();
			return message.sendTranslated("core:set.updated", [{
				key: key.value,
				val: val.value.join(" ")
			}]);
		}
		let out;
		out = "```md";
		out += this.format(guild.toObject(), 0);
		out += "```";
		return message.channel.send(out);
	}

	format(object, indent) {
		let toReturn;
		toReturn = "";
		for (const [key, value] of Object.entries(object)) {
			const keyFormat = `${key.charAt(0).toUpperCase()}${key.slice(1)}`;
			const notMeta = !["_id", "__v"].includes(key);
			if (typeof value === "object" && notMeta) {
				const exists = Object.entries(value).length ? "" : "N/A";
				toReturn += `\n${"  ".repeat(indent)}${keyFormat}: ${exists}`;
				toReturn += this.format(value, indent + 1);
			} else if (notMeta) {
				toReturn += `\n${"  ".repeat(indent)}- ${keyFormat} | ${value}`;
			}
		}
		return toReturn;
	}
};
