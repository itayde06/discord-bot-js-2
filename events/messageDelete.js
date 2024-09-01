const { MessageEmbed } = require('discord.js');

module.exports.run = (client, message) => {
  if (message.webhookID || (!message.content && message.embeds.length === 0)) return;
  
  const embed = new MessageEmbed()
    .setTitle('הודעה נמחקה')
    .setTimestamp()
    .setColor("GREEN");
  if (message.content) {
    const messageDeleteLog = message.guild.channels.cache.get('478963949115539456');
    if (
      messageDeleteLog &&
      messageDeleteLog.viewable &&
      messageDeleteLog.permissionsFor(message.guild.me).has(['SEND_MESSAGES', 'EMBED_LINKS'])
    ) {

    const loggchannel = message.guild.channels.cache.get('478963949115539456');
    if(message.channel.id === loggchannel.id) return;
      if (message.content.length > 1024) message.content = message.content.slice(0, 1021) + '...';

      embed
        .setDescription(`ההודעה של ${message.member} בחדר ${message.channel} נמחקה.`)
        .addField('תוכן ההודעה', message.content);
        
      messageDeleteLog.send({embeds: [embed]});
    }
  } else {
    const messageDeleteLog = message.guild.channels.cache.get('478963949115539456');
    if (
      messageDeleteLog &&
      messageDeleteLog.viewable &&
      messageDeleteLog.permissionsFor(message.guild.me).has(['SEND_MESSAGES', 'EMBED_LINKS'])
    ) {
    const loggchannel = message.guild.channels.cache.get('478963949115539456');
    if(message.channel.id === loggchannel.id) return;
      embed
        .setTitle('הודעה נמחקה')
        .setDescription(`ההודעת אמבד של ${message.member} בחדר ${message.channel} נמחקה.`);
      messageDeleteLog.send({embeds: [embed]});
    }
  }
  
};