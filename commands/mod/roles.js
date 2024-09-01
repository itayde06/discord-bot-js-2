const Discord = require("discord.js");
const { Collection, MessageEmbed } = require(`discord.js`);
const { MessageActionRow, MessageButton } = require("discord.js");
const db = require("quick.db");

module.exports.run = async (client, message, args) => {
 if(!message.member.permissions.has("ADMINISTRATOR")) return;

const a = new MessageButton()
 .setLabel('❓')
.setStyle('PRIMARY')
.setCustomId('737323112722595850')
  
const b = new MessageButton()
 .setLabel('✨')
.setStyle('PRIMARY')
.setCustomId('983718227848863744')

const b2 = new MessageButton()
 .setLabel('💰')
.setStyle('PRIMARY')
.setCustomId('983718451476590652')

const b3 = new Discord.MessageButton()
  .setLabel('🎁')
.setStyle('PRIMARY')
.setCustomId('983719220347019294')

const c33 = new Discord.MessageButton()
  .setLabel('💡')
.setStyle('PRIMARY')
.setCustomId('996766347184848969')

const embed = new MessageEmbed()
.setTitle(`PutiTP | קבלת רולים `)
.setColor("BLUE")
.setDescription(`**לקבלת רול המעדכן על שאלות יומיות בשרת לחצו על - ❓

לקבלת רול המעדכן על חידות יומיות בשרת לחצו על - ✨

לקבלת רול המעדכן על הקזינו בשרת לחצו על - 💰

לקבלת רול המעדכן על דרופים בקזינו נושאים לחצו על - 🎁

לקבלת רול המעדכן על עובדות יומיות בשרת לחצו על - 💡**`)

let arr = [a,b, b2, b3, c33]
let row1 = new MessageActionRow()
.addComponents(
  [a,b, b2, b3, c33]
)


await message.channel.send({ ephemeral: true, embeds: [embed], components: [row1] })

};

module.exports.conf = {
  enable: true,
  aliases: []
};

module.exports.help = {
  name: "roles",
  category: "mod",
  usage: "",
  desc: ""
};