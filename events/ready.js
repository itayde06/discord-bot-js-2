const Discord = require("discord.js");
const { MessageEmbed } = require("discord.js");
const fetch = require("node-fetch");
const { exec } = require("child_process")

module.exports.run = async client => {
  const guild = client.guilds.cache.get("259725541857296394");

  console.log(`Bot Online!`);
  process.bot = client;





  global.hastebin = hastebin;
  if (guild) client.user.setActivity(`${guild.memberCount} Members.`, { type: 'WATCHING' });

}