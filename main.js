const Discord = require('discord.js');
const client = new Discord.Client();
const config = require('./config.json');

client.on('ready', () => {
	console.log(`Logged in as ${client.user.tag}!`);
});

client.on('guildMemberAdd', member => {
	console.log(`Welcoming ${member.name} to ${member.guild.name}`);
	member.guild.systemChannel.send(`Welcome to ${member.guild.name}, ${member.name}!`);
});

client.login(config.token);
