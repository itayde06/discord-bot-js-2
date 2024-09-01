const Discord = require("discord.js");
const pms = require("parse-ms")
const ms = require("ms")
const db = require("quick.db");
module.exports.run = async (client, message, args) => {
    
 

    let role = message.guild.roles.cache.get("478948930709618720");
      if(message.member.roles.highest.position < role.position && !client.config.devs.includes(message.author.id)) return  message.reply(` ${message.author}, אין לך מספיק גישות כדי להשתמש בפקודה זו`) .then(msg => {setTimeout(() => msg.delete(), 5000)}).catch(err => { });
  let member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
  if (!member)
 return message.reply(` ${message.author}, אתה צריך לתייג משתמש`) .then(msg => {setTimeout(() => msg.delete(), 5000)}).catch(err => { });
    let muterole = message.guild.roles.cache.find(r => r.name === "Chat Muted");
    if (!muterole) return  message.reply(` ${message.author}, אין רול מיוט בשרת`) .then(msg => {setTimeout(() => msg.delete(), 5000)}).catch(err => { });
    
    if(!member.roles.cache.has(muterole.id)) return message.reply(` ${message.author}, משתמש זה לא נמצא במיוט`) .then(msg => {setTimeout(() => msg.delete(), 5000)}).catch(err => { });
    
  let log = message.guild.channels.cache.get("934088950161747968");

  message.delete().catch(err => { });

  let embed = new Discord.MessageEmbed()
      .setAuthor({name :`${message.guild.name} | הורדת מיוט`})
      .setColor("BLUE")
      .addField("משתמש", `${member}`, true)
      .addField("צוות", `${message.member}`, true)
      .setTimestamp();
    
    
    if(log) log.send({embeds: [embed]})
    
    message.reply(`**ירד ל${member} המיוט.**`).then(msg => {setTimeout(() => msg.delete(), 5000)}).catch(err => { });
      
    member.roles.remove(muterole.id) // removes the mute role to the member

    db.delete(`${message.guild.id}.muted.${member.user.id}`)
    

};

module.exports.conf = {
  enable: true,
  aliases: []
};

module.exports.help = {
  name: "unmute",
  category: "mod",
  usage: "",
  desc: ""
};