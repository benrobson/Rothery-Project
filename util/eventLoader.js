const reqEvent = (event) => require(`../events/${event}`)

module.exports = (dclient) => {
	dclient.on('ready', () => reqEvent('ready')(dclient));
};
