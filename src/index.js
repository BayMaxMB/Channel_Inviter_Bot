const TelegramBot = require('node-telegram-bot-api');
const request = require('request');
const config = require('./config');
const _ = require('./helper');

const bot = new TelegramBot(config.TOKEN, {
	polling: false,
	webHook: {
		host: config.host,
		port: config.port,
		autoOpen: false
	}
});

bot.openWebHook();
bot.setWebHook(`${config.url}/bot${config.TOKEN}`);

console.log('\nBot has been Started ...\n');

bot.on('message', msg => {
	console.log('\n---------- New Message ----------\n');
	console.log(msg);
});

bot.on('callback_query', (query) => {

});

bot.onText(/\/help( .+)*/, (msg, [source, match]) => {
	const { chat: { id }} = msg;
	bot.sendMessage(id, `Your argument: ${match}`);
});

// request.post({
// 	url: `https://api.telegram.org/bot${config.TOKEN}/createChatInviteLink`,
// 	json: {
// 		chat_id: config.channelID,
// 		member_limit: 1
// 	}
// }, (error, response, body) => {
// 	console.log(body);
// });

request.post({
	url: `https://api.telegram.org/bot${config.TOKEN}/editChatInviteLink`,
	json: {
		chat_id: config.channelID,
		// invite_link: 'https://t.me/joinchat/mxCMroMG4WRlNzdi',
		invite_link: 'https://t.me/joinchat/m1FnQ6R1z7Q3MmY6',
		// member_limit: 999
	}
}, (error, response, body) => {
	console.log(body);
});