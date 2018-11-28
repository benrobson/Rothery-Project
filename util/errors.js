const Discord = require('discord.js');

module.exports.noLogChannel = (message, perm) => {
  let embed = new Discord.RichEmbed()
  .setTitle('An error has occurred!')
  .setDescription('Sorry, I could not find the `#twitch-chat` channel. This message was unable to be sent!');

  message.channel.send(embed);
};
