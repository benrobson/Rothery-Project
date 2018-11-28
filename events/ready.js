const settings = require('../settings.json');
const chalk = require('chalk');

module.exports = async dclient => {
  dclient.user.setActivity('Test Playing Message');
  console.log(chalk.green('[Console] ') + 'Bot is online.');
};
