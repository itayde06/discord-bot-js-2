const Discord = require('discord.js');
const { Client, Collection, Intents } = require('discord.js');
const { MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");
const { readdirSync } = require('fs');
const db = require("quick.db");
const config = require('./config');
const intents = new Intents();
intents.add(
	'GUILD_PRESENCES',
	'GUILD_MEMBERS',
	'GUILDS',
	'GUILD_VOICE_STATES',
	'GUILD_MESSAGES',
	'GUILD_MESSAGE_REACTIONS'
);


const client = new Client({
	partials: [`REACTION`, `MESSAGE`, `CHANNEL`],
	intents: intents,
	disableMentions: 'everyone',
	fetchAllMembers: true
});

client.login(config.token);

client.on("interactionCreate", async (interaction) => {
  let user = interaction.author;
  let member = interaction.member;
  if (interaction.isButton()) {
    if (interaction.member.permissions.has("MANAGE_MESSAGES"))
      if (interaction.customId === 'dwwd') {
        let role = interaction.message.guild.roles.cache.find(role => role.id === "478948930709618720");
         await interaction.deferUpdate();

        const row = new MessageActionRow()
       
          .addComponents(
            new MessageButton()
              .setCustomId('re')
              .setLabel(`${interaction.user.username}#${interaction.user.discriminator} - מטופל על ידי`)
              .setStyle('PRIMARY')
              .setDisabled(true)
          )

        interaction.message.edit({ components: [row] })
        
        
      }
  }
});
client.config = require('./config.js');
client.prefix = config.prefix;
client.db = db;

client.commands = new Collection();
client.aliases = new Collection();

global.Discord = Discord;
global.db = db;
global.fs = require('fs');
global.pms = require('parse-ms');

readdirSync('./commands/').forEach(category => {
	const files = readdirSync(`./commands/${category}/`);
	files.forEach(file => {
		if (!file.endsWith('.js')) return console.log(`${file} is not a command`);
		var cs = require(`./commands/${category}/${file}`);
		client.commands.set(cs.help.name, cs);
		cs.conf.aliases.forEach(a => client.aliases.set(a, cs.help.name));
	});
});

readdirSync('./events/').forEach(evtFileName => {
	const eventFile = require(`./events/${evtFileName}`);
	const evtName = evtFileName.split('.').shift();
	client.on(evtName, eventFile.run.bind(null, client));
});