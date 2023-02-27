const operations = require('./operations');
const input = require('./input');
const { peek } = require('@laufire/utils/debug');

const start = async () => {
	let command = '';

	// eslint-disable-next-line no-await-in-loop
	while((command = await input('> ')) !== '.exit') {
		peek(operations(...command.split(' ')
			.map((token) => (isNaN(Number(token)) ? token : Number(token)))));
	}
};

start();
