const Discord = require("discord.js");
const db = require("quick.db");
const ms = require(`ms`);
const { Collection, MessageEmbed } = require("discord.js");
 


module.exports.run = async (client, message, args) => {



       const user = message.mentions.members.first() || message.member;
  var member = message.mentions.users.first() || message.author;
 var coins =  db.get(`${message.guild.id}.coins.${member.id}`)
   if (!coins || coins <= 0) coins = 0;
        coins = coins.toLocaleString();




       
 

const embed4 = new Discord.MessageEmbed()
   .setColor("#ff0004")
 .setThumbnail(member.displayAvatarURL({ dynamic: true }))
    .setAuthor(`${member.tag}`, member.displayAvatarURL({ dynamic: true }))
    .setDescription(`**Account ID: ${user.id}**\n
    **<:PutiSummerCoin:988038171507957780> : ${coins}**`)

     .setTimestamp();
  message.reply({embeds: [embed4]})



}


module.exports.conf = {
  enable: true,
  aliases: []
};

module.exports.help = {
  name: "xp",
  category: "Shop",
  usage: "",
  desc: ""
};