const Discord = require("discord.js");
const ms = require("ms");
const pms = require("parse-ms");
const db = require("quick.db");
const { Permissions } = require('discord.js')
module.exports.run = async (client, message, args) => {


    let role = message.guild.roles.cache.get("478948930709618720");
      if(message.member.roles.highest.position < role.position && !client.config.devs.includes(message.author.id)) return message.reply(` ${message.author}, אין לך מספיק גישות כדי להשתמש בפקודה זו`) .then(m => m.delete({ timeout: 5000 })).catch(err => { });
  let member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
  if (!member)
  return message.reply(` ${message.author}, אתה צריך לתייג משתמש`) .then(msg => {setTimeout(() => msg.delete(), 5000)}).catch(err => { });
  if (member.user.id === message.author.id)
   return message.reply(` ${message.author}, אתה לא יכול להביא מיוט בוויס לעצמך.`) .then(msg => {setTimeout(() => msg.delete(), 5000)}).catch(err => { });
  if (member.user.id === client.user.id)
   return mmessage.reply(` ${message.author},  אתה לא יכול להביא לי מיוט  בוויס`)  .then(msg => {setTimeout(() => msg.delete(), 5000)}).catch(err => { });
  if (member.user.id === message.guild.ownerID) 
    return message.reply(` ${message.author}, אתה לא יכול להביא מיוט בוויס לאוונר של השרת.`)  .then(msg => {setTimeout(() => msg.delete(), 5000)}).catch(err => { });
   if(!message.guild.me.permissions.has(Permissions.FLAGS.MANAGE_NICKNAMES)) return message.reply(` ${message.author}, אתה לא יכול להביא מיוט בוויס לצוות`)   .then(msg => {setTimeout(() => msg.delete(), 5000)}).catch(err => { });
  if (message.member.roles.highest.position <= member.roles.highest.position) 
   return message.reply(` ${message.author}, אתה לא יכול לתת מיוט בוויס למישהו מעליך.`).then(msg => {setTimeout(() => msg.delete(), 5000)}).catch(err => { });
    
    let mutetime = args[1];
    if(!mutetime)   return message.reply(` ${message.author}, אתה צריך לרשום את זמן המיוט!`)  .then(msg => {setTimeout(() => msg.delete(), 5000)}).catch(err => { });
    if(isNaN(ms(mutetime)))   return message.reply(` ${message.author}, זמן המיוט אינו חוקי`)   .then(msg => {setTimeout(() => msg.delete(), 5000)}).catch(err => { });
    
    message.delete().catch(err => { });

    let memberCoins = db.get(`${message.guild.id}.coins.${member.id}`) || 0;

    let muterole = message.guild.roles.cache.find(r => r.name === "Voice Muted");
    if (!muterole) {
        try {
            muterole = await message.guild.createRole({
            name: "Voice Muted",
            color: "#000000",
            permissions: []
          });
          message.guild.channels.cache.forEach(async (channel, id) => {
                await channel.permissionsOverwrites.edit(muterole, {
              SPEAK: false
            });
          });
        } catch (e) {
          console.log(e.stack);
        }
      }
    
    if(member.roles.cache.has(muterole.id))   return message.channel.send(` ${message.author}, אתה לא יכול לתת מיוט בוויס למישהו  שכבר נמצא במיוט בוויס.`)   .then(m => m.delete({ timeout: 5000 })).catch(err => { });
    
    let reason = args.slice(2).join(" ");
    if(!reason) reason = "אין סיבה";
    
  let log = message.guild.channels.cache.get("934088950161747968");
  
  let time = pms(ms(mutetime));

        let days = "";
        if (time.days) days = `${time.days} days, `;

        let hours = "";
        if (time.hours) hours = `${time.hours} hours, `;

        let minutes = "";
        if (time.minutes) minutes = `${time.minutes} minutes, `;

        let seconds = "";
        if (time.seconds) seconds = `${time.seconds} seconds`;  

  let embed = new Discord.MessageEmbed()
          .setAuthor({name :`${message.guild.name} | מיוט בוויס`})
      .setColor("RED")
    .addField(`משתמש`, `${member}`)
      .addField(`צוות`, `${message.member}`)
      .addField(`זמן המיוט`, `${days}${hours}${minutes}${seconds}`)
      .addField(`סיבה`, `${reason}`)
      .setTimestamp();
    
    
    if(log) log.send({embeds: [embed]})
    
    message.channel.send(`**${member} קיבל מיוט בוויס.**`).then(msg => {setTimeout(() => msg.delete(), 5000)}).catch(err => { });
      
    member.roles.add(muterole.id) // adds the mute role to the member

  db.set(`${message.guild.id}.voice_muted.${member.user.id}`, true);

   
  
      setTimeout(async function() {
      if(member.roles.cache.has(muterole.id)) {
          member.roles.remove(muterole.id) // removes the mute role for the member
        
          db.delete(`${message.guild.id}.voice_muted.${member.user.id}`)

          message.channel.send(`**ירד המיוט בוויס ל${member}.**`).then(msg => {setTimeout(() => msg.delete(), 5000)}).catch(err => { });
      };
       }, ms(mutetime));
    

};

module.exports.conf = {
  enable: true,
  aliases: []
};

module.exports.help = {
  name: "vmute",
  category: "mod",
  usage: "",
  desc: ""
};