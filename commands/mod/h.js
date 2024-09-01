
const Discord = require("discord.js");
const rps = new Discord.Collection()
const ms = require(`ms`);
const { Collection, MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");


module.exports.run = async (bot, message, args) => {
            if(message.member.roles.cache.get("996804005772673175")) return message.channel.send("**עקב סיבות כאלה ואחרות, הורחקת מפקודה זו.**")
  .then(msg => {setTimeout(() => msg.delete(), 5000)}).catch(err => { });

     let role = message.guild.roles.cache.find(role => role.id === "478948930709618720");

    const ms = require("ms");
    const pms = require("parse-ms");
    let cd = db.get(`${message.guild.id}.helpme_cooldown.${message.author.id}`)
    let cooldownTime = ms("30s")
    let timeObj = pms(cooldownTime - (Date.now() - cd));
      let hours = "";
      if (timeObj.hours) hours = `${timeObj.hours} שעות, `;
      let minutes = "";
      if (timeObj.minutes) minutes = `${timeObj.minutes} דקות, `;
      let seconds = "";
      if (timeObj.seconds) seconds = `${timeObj.seconds} שניות`;
      if (cd !== null && cooldownTime - (Date.now() - cd) > 0)
        return message.reply(
          `**אתה צריך לחכות ${hours}${minutes}${seconds}**`
        );
    
        db.set(`${message.guild.id}.helpme_cooldown.${message.author.id}`, Date.now());
    
            let voicechannel = message.member.voice.channel;
            let reason = args.join(" ");
    
            function fix_helpme(text) {
            return text.replace(/@(everyone|here|[!&]?[0-9]{17,21})/g, "@\u200b$1");
            };
    
  let lfe = new Discord.MessageButton()
    .setStyle("PRIMARY")
    .setLabel('לטפל')
    .setCustomId("dwwd")

     let row1 = new MessageActionRow()
        .addComponents(
            [lfe]
        )
  
  
         
      
 
 await message.channel.send({ content: `<@&478948930709618720>\n <a:PutiAnnounce:808693406259478580>**אנא המתן, צוות השרת מיד יתפנה לעזרתך** ${message.author}\n**Room:** ${voicechannel || "<:x_:740632575130992670>  **לא נמצא באף חדר**"}\n**Reason:** \`${fix_helpme(reason) || "אין סיבה."}\``, ephemeral: true, components: [row1] });
  
    

    /**
     * @param {Discord.ButtonInteraction} MessageButton
     */
    
    
  setTimeout(() => {
    bot.db.delete(`${message.guild.id}.helpme_cooldown.${message.author.id}`);
  }, cooldownTime); 


}
module.exports.conf = {
  enable: true,
  aliases: []
};

module.exports.help = {
  name: "h",
  category: "other",
  usage: "",
  desc: ""
};    
