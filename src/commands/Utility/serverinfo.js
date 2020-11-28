const SyrusCommand = require("../../lib/structures/SyrusCommand");
const { Args, CommandOptions } = require("@sapphire/framework");
const { MessageEmbed } = require("discord.js");

module.exports = class ClientCommand extends SyrusCommand {
	constructor(context) {
		super(context, {
			name: "serverinfo",
			aliases: ["sinfo", "server", "si"],
			description: "utilities:serverinfo.description",
			preconditions: ["GuildOnly"]
		});
	}

	async run(message) {
		const {guild} = message;
		const owner = await guild.members.fetch(guild.ownerID);
		message.channel.send(
			new MessageEmbed()
				.setColor("#4287f5")
				.setTitle(`About ${guild.name}`)
				.addField("Server Owner", `${owner.user.username}#${owner.user.discriminator}\n(${owner.displayName})`, true)
				.addField("Boost Status", `<:boost:763412360433369168> Level ${guild.premiumTier}\n(${guild.premiumSubscriptionCount} boosts)`, true)
				.addField(
					"Members",
					`
						${guild.memberCount} total
					`,
					true
				)
				.addField(
					"Stats",
					`
						<:textchannel:763412308780908555> ${guild.channels.cache.filter((channel) => channel.type === "text").size} text channel(s)
						<:voicechannel:763412288668827728> ${guild.channels.cache.filter((channel) => channel.type === "voice").size} voice channel(s)
						<:emoji:763412234218766337> ${guild.emojis.cache.size} emoji(s)
						<:members:763412258235482153> ${guild.roles.cache.size} role(s)
					`,
					true
				)
				.addField(
					"Settings",
					`
						<:greencheck:741524095547736064> Verification: ${guild.verificationLevel.toLowerCase()}
						<:greencheck:741524095547736064> Filter: ${guild.explicitContentFilter.toLowerCase()}
						<:greencheck:741524095547736064> Region: ${guild.region}
						<:greencheck:741524095547736064> 2FA: ${guild.mfaLevel}
					`,
					true
				)
				.setThumbnail(guild.iconURL({format: "png", dynamic: true}))
				.setFooter(`Guild ID: ${guild.id} | Owner ID: ${owner.id}`)
		);
	}
};
