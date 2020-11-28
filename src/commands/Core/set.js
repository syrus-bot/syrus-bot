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

		if (key.value !== undefined && val.value !== undefined) {
			guild.set(key.value, val.value.join(" "));
			await guild.save();
			return await message.sendTranslated("core:set.updated", [{
				key: key.value,
				val: val.value.join(" ")
			}]);
		}
		let out;
		out += "```md"
		for (const [key, value] of Object.entries(guild.toObject())) {
			out += `\n[ ${key} ][ ${value} ]`
		}
		out += "```"
		return await message.channel.send(out);
	}
};
