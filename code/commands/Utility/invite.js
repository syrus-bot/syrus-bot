const { Args, Command, CommandOptions } = require("@sapphire/framework");

module.exports = class ClientCommand extends Command {
    constructor(context) {
        super(context, {
            name: "invite",
            aliases: ["ci", "crinv"],
            description: "create a server invite!",
        });
    }

    async run(msg) {
        const get_pre = require("../../config.json");
        const args = msg.content.slice(get_pre.prefix.length).split(/ +/g);

        if (!msg.member.hasPermission(["CREATE_INSTANT_INVITE"])) return msg.channel.send("You must have the **Create Invite** permission to create invites!");
        if (!msg.guild.me.hasPermission(["CREATE_INSTANT_INVITE"])) return msg.channel.send("I am missing the **Create Invite** permission and therefore can't run this command");

        msg.channel.createInvite({ maxAge: 0, maxUses: 0 }, `Created by ${msg.author.username + "#" + msg.author.discriminator}`).then((invite) => {
            msg.channel.send("**Here is your invite:** https://discord.gg/" + invite);
        });
    }
};
