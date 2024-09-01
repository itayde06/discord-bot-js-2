const Discord = require("discord.js");
const ms = require("ms");

module.exports.run = async (bot, oldState, newState) => {
  
  
  let blacklist_voices = ["596648080506617858","983251151220785162","719524546624880677","970745610078679132","479020264567603200","479020199547371521","502130639873507328"];

  let newMember = newState.member
  let oldMember = oldState.member

if(newMember.bot) return;
if(oldMember.bot) return;
  
  let newUserChannel = newState.channel
  let oldUserChannel = oldState.channel
  
  if(oldUserChannel === null && newUserChannel !== null) {
     // User Joins a voice channel
    
bot[`voice_coins_${newMember.id}`] = setInterval(function() {
if(!newMember.voice.serverMute && !newMember.voice.selfMute && !blacklist_voices.includes(newUserChannel.id)) {
let coins = bot.db.get(`${newMember.guild.id}.coins.${newMember.id}`);
if(!coins) coins = 0;
  
  bot.db.add(`${newMember.guild.id}.coins.${newMember.id}`, getRandomInt(1, 2));
  
}
}, ms("3m"))
  } else if(newUserChannel === null) {
    // User leaves a voice channel
    
           clearInterval(bot[`voice_coins_${oldMember.id}`])
  }
  
  function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}
  
};