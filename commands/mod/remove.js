const Discord = require("discord.js");
const db = require("quick.db");
const ms = require(`ms`);

module.exports.run = async (bot, message, args) => {

   if (!message.member.permissions.has("ADMINISTRATOR")) return;
        var user = message.mentions.members.first()
            var SyntaxError = new Discord.MessageEmbed()
                .setColor("RED")
                  .setAuthor({ name:"בעיה", iconURL:"https://cdn.discordapp.com/attachments/841618267973746688/841706456671191050/833270972790341632.gif"})
                .setDescription(`tag user!`)
            if (!user || user == undefined)
            return message.reply({embeds: [SyntaxError]})
        var amount = args[1];
            var SyntaxAmountError = new Discord.MessageEmbed()
                .setColor("RED")
                .setAuthor({ name:"בעיה", iconURL:"https://cdn.discordapp.com/attachments/841618267973746688/841706456671191050/833270972790341632.gif"})
                .setDescription(`Please indicate the number of coins`)
                if (!amount || isNaN(amount))
            return message.reply({embeds: [SyntaxAmountError]})
        db.subtract(`${message.guild.id}.coins.${user.id}`, amount)
        var SuccessEmbed = new Discord.MessageEmbed()
            .setColor("GREEN")
            .setAuthor({ name:"צלח",iconURL: "https://cdn.discordapp.com/emojis/788751803743338506.gif?v=1"})
            .setDescription(`${message.author} הוריד-ל ${user} ${amount} <:PutiSummerCoin:988038171507957780> !`)
            .setTimestamp();
        message.reply({embeds: [SuccessEmbed]})

};

module.exports.conf = {
  enable: true,
  aliases: []
};

module.exports.help = {
  name: "remove",
  category: "Shop",
  usage: "",
  desc: ""
};