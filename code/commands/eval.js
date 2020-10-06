exports.run = (client, msg, args) => {
    const config = require('../config.json');
    if (!config.developers.includes(msg.author.id)) return msg.channel.send("Access denied! You don't have permission to use this command.")
    
    try {
        function clean(text) {
            if (typeof (text) === "string")
                return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
            else
                return text;
        }
        let code = args.join(" ");
        code = code.replace(/```js/g, '');
        code = code.replace(/```/g, '');
  
        let evaled = eval(code);
  
        if (typeof evaled == "string") {
  msg.channel.send('```Successfully executed code.```');
        }
        if (typeof evaled !== "string")
            evaled = require("util").inspect(evaled);
        msg.channel.send(clean(evaled), {
            code: "xl"
        });
    } catch (err) {
        msg.channel.send(`\`ERROR\` \`\`\`xl\n${clean(err)}\n\`\`\``);
    }
};