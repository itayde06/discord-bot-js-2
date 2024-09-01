const { MessageEmbed } = require('discord.js');
    const embed = new MessageEmbed()
module.exports.run = async (client, oldMember, newMember) => {
/*  קבלת רול  */
if (oldMember.roles.cache.size < newMember.roles.cache.size) {
    const roleLog = oldMember.guild.channels.cache.get('478963949115539456');//איידי של הצאנל
    if (
      roleLog &&
      roleLog.viewable &&
      roleLog.permissionsFor(oldMember.guild.me).has(['SEND_MESSAGES', 'EMBED_LINKS'])
    ) {
      const role = newMember.roles.cache.difference(oldMember.roles.cache).first();
      embed
      .setColor("#62f1cf")
        .setTitle('לוג רולים')
        .setDescription(`${newMember} קיבל את הרול ${role} .`)
        .setTimestamp();
      roleLog.send({embeds: [embed]});
    }
  }
/* ירידת רול */
  if (oldMember.roles.cache.size > newMember.roles.cache.size) {
    const roleLog = oldMember.guild.channels.cache.get('478963949115539456');//איידי של הצאנל
    if (
      roleLog &&
      roleLog.viewable &&
      roleLog.permissionsFor(oldMember.guild.me).has(['SEND_MESSAGES', 'EMBED_LINKS'])
    ) {
      const role = oldMember.roles.cache.difference(newMember.roles.cache).first();
      embed
       .setColor("#62f1cf")
        .setTitle('לוג רולים')
        .setDescription(`ל ${newMember} ירד הרול ${role} .`)
              .setTimestamp();
      roleLog.send({embeds: [embed]});
    }
};
}