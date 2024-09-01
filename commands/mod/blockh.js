const Discord = require("discord.js");
const { MessageEmbed } = require(`discord.js`);
const ms = require(`ms`);
const pms = require("parse-ms");
const db = require("quick.db");

module.exports.run = async (client, message, args) => {
  
    let role = message.guild.roles.cache.get("478948930709618720");
      if(message.member.roles.highest.position < role.position && !client.config.devs.includes(message.author.id)) return message.reply(` ${message.author}, אין לך מספיק גישות כדי להשתמש בפקודה זו`) .then(msg => {setTimeout(() => msg.delete(), 5000)}).catch(err => { });

      
        const member = message.mentions.members.first();
        if (!member) return message.reply("אתה צריך לתייג משתמש!") 

        let role16 = message.guild.roles.cache.get("996804005772673175");
        
 let log = message.guild.channels.cache.get("934088950161747968");


    let embed = new Discord.MessageEmbed()
      .setAuthor(`${message.guild.name} | הרחקה מהלפ`)
      .setColor("RED")
      .addField(`משתמש`, `${member}`)
      .addField(`צוות`, `${message.member}`)
      .setTimestamp();
    
    
    if(log) log.send({embeds: [embed]})
        if(role16) {
          member.roles.add(role16.id);
          message.reply(`**${member} קיבל הרחקה מהלפ. **`).then(msg => {setTimeout(() => msg.delete(), 5000)}).catch(err => { });
        }
        
    };



        module.exports.conf = {
  enable: true,
  aliases: []
};

module.exports.help = {
  name: "hb",
  category: "other",
  usage: "",
  desc: ""
};    
