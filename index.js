const Discord = require('discord.js');
const dclient = new Discord.Client({disableEveryone: true});
const tmi = require('tmi.js');
const fs = require('fs');
const chalk = require('chalk');
const settings = require('./settings.json');
dclient.commands = new Discord.Collection();
require('./util/eventLoader.js')(dclient);

// Reads all Discord commands and boots them in
fs.readdir('./commands/', (err, files) => {
  if (err) console.log(err);
  let jsfile = files.filter(f => f.split(".").pop() === 'js')
  if (jsfile.length <= 0) {
    console.log(chalk.red('Couldn\'t find commands.'));
    return
  }

jsfile.forEach((files, i) => {
    let props = require(`./commands/${files}`);
    console.log(chalk.green('[Console] ') + chalk.yellow(files) + ` has been loaded.`);
    client.commands.set(props.help.name, props);
  })
});

const options = {
    options: {
        debug: true
    },
    connection: {
        reconnect: true
    },
    identity: {
        username: `${settings.identityusername}`,
        password: `${settings.identitypassword}`
    },
    channels: [`${settings.channel}`]
};

const tclient = new tmi.client(options);
let prefix = settings.prefix;

// Message Guild Event
dclient.on('message', (message) => {
  if (message.author.bot) return;
  if (message.channel.type === "dm") return;
  let prefix = settings.prefix;

  let messageArray = message.content.split(" ");
  let cmd = messageArray[0];
  let args = messageArray.slice(1);

  if (!cmd.startsWith(prefix)) return;
  let commandfile = client.commands.get(cmd.slice(prefix.length));
  if (commandfile) commandfile.run(client,message,args);

  tclient.on('chat', (channel, user, message) => {
      let sender = user['display-name'];

      let auditlogchannel = message.guild.channels.find(c => c.name === 'twitch-chat');
      if (!auditlogchannel) return console.log('lol there was an error');

      auditlogchannel.send('embed');
      console.log('message');
  });
});

tclient.on('chat', (channel, user, message, self) => {
    // Don't listen to own messages
    if (self) return;
    let sender = user['display-name'];

    if (message === `${prefix}hi`) {
      tclient.action(`${settings.channel}`, 'Hello There.');
    }
});

// Connect clients to platforms
tclient.connect(); // Twitch
dclient.login(`${settings.dtoken}`); // Discord
