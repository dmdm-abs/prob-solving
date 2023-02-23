const { map } = require('@laufire/utils/collection');
const { peek } = require('@laufire/utils/debug');

const operations = {
	add: ([first, second]) => first + second,
	sub: ([first, second]) => first - second,
	mul: ([first, second]) => first * second,
	div: ([first, second]) => first / second,
};

const display = (data) => {
	peek(data);
};

const funcName = process.argv[2];

// eslint-disable-next-line no-magic-numbers
const data = map(process.argv.slice(3), (num) => Number(num));

const main = () => {
	display(operations[funcName](data));
};

main();
