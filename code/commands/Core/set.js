const { Args, Command, CommandOptions } = require('@sapphire/framework');


module.exports = class ClientCommand extends Command {
    constructor(context) {
        super(context, {
            name: "set",
            description: "commands:set.description",
            preconditions: ["GuildOnly", "serverowner"]
        });
    }
    
    async run(message, args) {
        const guild = await message.client.settings.guild(message.guild.id);
        const key = await args.pickResult('string');
        const val = await args.repeatResult('string');
        
        if (key.value !== undefined && val.value !== undefined) {
            guild.set(key.value, val.value.join(' '));
            await guild.save();
            return await message.sendTranslated("commands:set.updated", [{
                key: key.value, 
                val: val.value.join(' ')
            }]);
        }
        let out = "```md"
        for (const [key, value] of Object.entries(guild.toObject())) {
            out += `\n[ ${key} ][ ${value} ]`
        }
        out += "```"
        return await message.channel.send(out);
    }
};