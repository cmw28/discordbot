const Discord = require('discord.js');
const client = new Discord.Client();
const fs = require('fs'); // we need this to read ./events

try { // try to get the config
  require('dotenv').config();
} catch { // if that goes wrong... complain and exit
  console.error('There is no .env! Please copy example.env to .env and add a token.');
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
client.login(process.env.TOKEN).catch(() => { // try to log in. if it fails, complain and exit.
  console.error('Failed to log in! Make sure .env has a valid token.');
  process.exit();
});
