const Discord = require('discord.js');
const client = new Discord.Client();
const fs = require('fs');

let config;
// check if there actually is a config. if not, complain and exit.
try {
  config = require('./config.json');
} catch {
  console.error('There is no config! Please copy ./defaultconfig.json to ./config.json and add a token.');
  process.exit();
}

fs.readdir('./events/', (err, files) => {
  if (err) return console.log.error(err);
  files.forEach(file => {
    const event = require(`./events/${file}`);
    const eventName = file.split('.')[0];
    client.on(eventName, event.bind(null, client));
  });
});

// try to log in. if it fails, complain and exit.
client.login(config.token).catch(() => {
  console.error('Failed to log in! Make sure ./config.json has a valid token.');
  process.exit();
});
