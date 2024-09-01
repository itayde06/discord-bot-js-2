const Discord = require("discord.js");
const fetch = require("node-fetch");
const fs = require("fs");
module.exports.run = async (client, message) => {
  if (message.author.bot) return;
  if (message.channel.type == "dm") return;
 

  let msg = message.content.toLowerCase() || message.content.toUpperCase();



  function getUserFromMention(mention) {
    mention = mention.split(" ");
    for (var i = 0; i < mention.length; i++) {
      if (mention[i].startsWith("<@!"))
        mention[i] = mention[i].replace("<@!", "<@");

      mention[i] = client.users.cache.find(
        x => x.toString() == mention[i].replace("!", "")
      )
        ? `@${client.users.cache.find(x => x.toString() == mention[i].replace("!", "")).tag
        }`
        : mention[i];
    }
    return mention.join(" ");
  }

  // Bot mention
  let mention = `<@!${client.user.id}>`;
  let mobileMention = `<@${client.user.id}>`;


  let prefix = client.db.get(`${message.guild.id}.prefix`) || client.prefix;

  if (!msg.startsWith(prefix)) return;
  let args = message.content
    .slice(prefix.length)
    .trim()
    .split(" ");
  const command = args.shift().toLowerCase();

  let cmd;
  if (client.commands.has(command) || client.aliases.has(command)) {
    client.commands.has(command)
      ? (cmd = client.commands.get(command))
      : (cmd = client.commands.get(client.aliases.get(command)));

    if (!cmd) return;


    let cmds = client.db.get(`${message.guild.id}${cmd.help.name}.value`)
    if (!cmds) cmds = 0
    cmds++
    client.db.set(`${message.guild.id}${cmd.help.name}`, cmds)

    if (!message.channel.permissionsFor(client.user).has(['SEND_MESSAGES'])) {
      return false;
    }

    if (!message.channel.permissionsFor(client.user).has(['EMBED_LINKS'])) {
      return message.reply("**I can't send embeds here.**");
    }

    if (cmd.conf.enable == false && !client.config.devs.includes(message.author.id)) return message.reply('**This command disable for now!**').then(msg => msg.delete({ timeout: 45000 }));
    if (["main", "maintenance"].includes(cmd.conf.enable) && !client.config.devs.includes(message.author.id)) return message.reply('**This command is on maintenance!**').then(msg => msg.delete({ timeout: 45000 }));

    let commandsDataArray = [];
    fs.readdirSync("./commands/").forEach(category => {
      const files = fs.readdirSync(`./commands/${category}/`);
      files.forEach(file => {
        var cs = require(`../commands/${category}/${file}`);
        commandsDataArray.push({ name: cs.help.name, category: category.split(" ").join("") })
      });
    });
    let commandData = commandsDataArray.filter(c => c.name == cmd.help.name)[0];
    let cmdData = client.db.get(`${message.guild.id}.${commandData.category}`)
    if (cmdData === false && !commandData.name.startsWith("set")) return;
    let cmdData2 = client.db.get(`${message.guild.id}.commands.disabled.${commandData.name}`)
    if (cmdData2 === true && !commandData.name.startsWith("set")) return;

    if (cmd.help.category == "leveling" && client.db.get(`${message.guild.id}.leveling.status`) != true) return;
    if (cmd.help.category == "shop" && client.db.get(`${message.guild.id}.shop.status`) != true) return;


    cmd.run(client, message, args).catch(async e => {
      console.error(e.stack)

      let embed = new Discord.MessageEmbed()
        .setColor("#36393F")
        .setTitle("Have Error on the bot")
        .addField("Author", message.author.tag, true)
        .addField("Server", message.guild.name, true)
        .addField("Channel", `#${message.channel.name}`, true)
        .addField("Command", `${prefix}${getUserFromMention(message.content.slice(prefix.length))}`, true)
        .addField("Error", `\`\`\`js\n${e.stack.split("\n").slice(0, 4).join("\n")}\n\`\`\``)

      //client.channels.cache.get("659308546760114178").send(embed)
    })

  }
}