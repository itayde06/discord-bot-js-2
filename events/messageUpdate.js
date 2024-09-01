const { MessageEmbed } = require('discord.js');

module.exports.run = (client, oldMessage, newMessage) => {

try{
  if (
    newMessage.member && 
    newMessage.id === newMessage.member.lastMessageID &&
    !oldMessage.command
  ) {
    client.emit('message', newMessage);
  }

  const embed = new MessageEmbed()
    .setAuthor(`Update`, newMessage.author.displayAvatarURL({ dynamic: true }))
    .setTimestamp()
    

  // Content change
  if (oldMessage.content != newMessage.content) {

    const messageEditLog = newMessage.guild.channels.cache.get('478963949115539456');
    if (
      messageEditLog &&
      messageEditLog.viewable &&
      messageEditLog.permissionsFor(newMessage.guild.me).has(['SEND_MESSAGES', 'EMBED_LINKS'])
    ) {

      if (newMessage.content.length > 1024) newMessage.content = newMessage.content.slice(0, 1021) + '...';
      if (oldMessage.content.length > 1024) oldMessage.content = oldMessage.content.slice(0, 1021) + '...';

      embed
        .setTitle('הודעה נערכה')
        .setDescription(`
          ההודעה של ${newMessage.member} בחדר ${newMessage.channel} נערכה [לך להודעה](${newMessage.url})
        `)
        .addField('לפני', `${oldMessage.content}`)
        .addField('אחרי', `${newMessage.content}`);
      messageEditLog.send({embeds: [embed]});
    }
  }
  if (oldMessage.embeds.length > newMessage.embeds.length) {
    const messageDeleteLog = newMessage.guild.channels.cache.get('478963949115539456');
    if (
      messageDeleteLog &&
      messageDeleteLog.viewable &&
      messageDeleteLog.permissionsFor(newMessage.guild.me).has(['SEND_MESSAGES', 'EMBED_LINKS'])
    ) {

      embed.setTitle('הודעה נמחקה');
      if (oldMessage.embeds.length > 1)
        embed.setDescription(`ההודעת אמבד של ${newMessage.member} בחדר ${newMessage.channel} נמחקה`);
      else
        embed.setDescription(`ההודעת אמבד של ${newMessage.member} בחדר ${newMessage.channel} נמחקה.`);
      messageDeleteLog.send({embeds: [embed]})
    }
  }
}catch{
  return;
  
}
};
