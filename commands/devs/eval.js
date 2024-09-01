const Discord = require("discord.js");
const fetch = require("node-fetch");
const beautify = require("beautify")
const fs = require("fs")
const resEmbed = new Discord.MessageEmbed();
module.exports.run = async (client, message, args) => {
    
const secrets = [process.env.TOKEN];

const replaceSecrets = (str, hid = "Hidden") => {
  secrets.forEach((s) => {
    if (s) str = str.replace(s, hid);
  });
  return str;
};

    
if (!client.config.devs.includes(message.author.id)) return;
    if (!args[0]) return message.reply("אתה צריך קוד מדויק")
        .then((msg) => msg.delete({ timeout: 5500 }));

    const { guild, channel, author, member, member: { user }, } = message;
    const guildMember = (id) => guild.member(id);
    const User = (id) => guild.member(id).user;

  if (!args[0])
    return message.reply("אתה צריך קוד מדויק").then(m => m.delete({ timeout: 5000}).catch(err => { }));
  let codein = args.join(" ")
  let code
    let type;

    try {
      code = eval(codein);
      type = code && code.constructor ? code.constructor.name : typeof code;
    } catch (err) {
      code = err.toString();
      type = err.name;
    }

    if (type === "Promise") {
      code = await code;
      type = code && code.constructor ? code.constructor.name : typeof code;
    }

    if (typeof code !== "string")
      code = require("util").inspect(code, { depth: 0, maxArrayLength: null });
    code = code.replace(/`/g);

    const output = `\`\`\`js\n${replaceSecrets(code)}\n\`\`\``;
    if (output.length > 1024) {
      let url = await hastebin.post(code)
      message.channel.send(`${url}.js`)
    } else message.channel.send(code, { code: "js" });

};

module.exports.conf = {
  enable: true,
  aliases: ["e"]
};

module.exports.help = {
  name: "e",
  category: "Devs",
  usage: "eval <evalate>",
  desc: "",
  perms: "bot_dev"
};