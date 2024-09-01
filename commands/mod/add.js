  const Discord = require("discord.js");
const db = require("quick.db");
const { Collection, MessageEmbed } = require(`discord.js`);


    module.exports.run = async (bot, message, args) => {
    
   
        if (!message.member.permissions.has("ADMINISTRATOR")) return;
        var user = message.mentions.members.first()
        if (!user || user == undefined) {
            var SyntaxError = new Discord.MessageEmbed()
                .setColor("RED")
               .setAuthor({ name:"Error", iconURL:"https://cdn.discordapp.com/attachments/841618267973746688/841706456671191050/833270972790341632.gif"})
                .setDescription(`Please mention a valid user!`)
             return message.reply({embeds: [SyntaxError]})
        }
        var amount = args[1];
        if (!amount || isNaN(amount)) {
            var SyntaxAmountError = new Discord.MessageEmbed()
                .setColor("RED")
                .setAuthor({ name:"Error", iconURL:"https://cdn.discordapp.com/attachments/841618267973746688/841706456671191050/833270972790341632.gif"})
                .setDescription(` Please mention a valid amount!`)
        message.reply({embeds: [SyntaxAmountError]})
        }
        db.add(`${message.guild.id}.coins.${user.id}`, amount)
        var SuccessEmbed = new Discord.MessageEmbed()
            .setColor("BLUE")
            .setAuthor({ name:"Success", iconURL:"https://cdn.discordapp.com/emojis/788751803743338506.gif?v=1"})
            .setDescription(`${message.author} Added to ${user} ${amount} <:PutiSummerCoin:988038171507957780> !`)
            .setTimestamp()
    message.reply({embeds: [SuccessEmbed]})
    
    };
module.exports.conf = {
  enable: true,
  aliases: []
};

module.exports.help = {
  name: "add",
  category: "Shop",
  usage: "",
  desc: ""
};