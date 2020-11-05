const Discord = require('discord.js');
const client = new Discord.Client();
const config = require('./config.json');
const fs = require('fs');

fs.readdir('./events/', (err, files) => {
  if (err) return console.log.error(err);
  files.forEach(file => {
    const event = require(`./events/${file}`);
    const eventName = file.split('.')[0];
    client.on(eventName, event.bind(null, client));
  });
});

client.login(config.token);
