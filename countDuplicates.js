const { peek } = require('@laufire/utils/debug');

const countDuplicates = (numbers) =>	numbers.reduce((acc, num) =>
	({ ...acc, [num]: (acc[num] || 0) + 1 }), []);
const main = () => {
	// eslint-disable-next-line no-magic-numbers
	const data = [1, 2, 3, 4, 2, 5, 3, 6, 3, 5, 2];
	const result = countDuplicates(data);

	peek(result);
};

main();
