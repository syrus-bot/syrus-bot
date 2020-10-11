
const { Args, Command, CommandOptions } = require('@sapphire/framework');


module.exports = class ClientCommand extends Command {
    constructor(context) {
        super(context, {
            name: "eval",
            description: "eval cmd"
        });
    }
    
    async run(msg) {
    const config = require('../../config.json');
    if (!config.developers.includes(msg.author.id)) return msg.channel.send("Access denied! You don't have permission to use this command.")


    if (msg.content.toLowerCase().includes('readdir') || msg.content.toLowerCase().includes('token')) return msg.channel.send('```Eval command has been blocked due to detected sensitive information.```')
    const args = msg.content.split(" ").slice(1);
    function clean(text) {
        if (typeof(text) === "string")
          return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
        else
            return text;
      }

      try {
        const code = args.join(" ");
        let evaled = eval(code);
   
        if (typeof evaled !== "string")
          evaled = require("util").inspect(evaled);
   
        msg.channel.send(clean(evaled), {code:"xl"});
      } catch (err) {
        msg.channel.send(`\`ERROR\` \`\`\`xl\n${clean(err)}\n\`\`\``);
      }
    
};
}