const Discord = require('discord.js');
const client = new Discord.Client();
const fs = require('fs'); // we need this to read ./events
let config; // creates a config thing for the try catch block to put the config into

try { // try to get the config
  config = require('./config.json');
} catch { // if that goes wrong... complain and exit
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

// client.login is a promise, so i just have to tack on a .catch for if it goes wrong
client.login(config.token).catch(() => { // try to log in. if it fails, complain and exit.
  console.error('Failed to log in! Make sure ./config.json has a valid token.');
  process.exit();
});
