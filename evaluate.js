const { map } = require('@laufire/utils/collection');
const { peek } = require('@laufire/utils/debug');
const operations = require('./operations');

const display = (data) => {
	peek(data);
};

const funcName = process.argv[2];

// eslint-disable-next-line no-magic-numbers
const data = map(process.argv.slice(3), (num) => Number(num));

const main = () => {
	display(operations(funcName, data));
};

main();
