const { peek, pretty } = require('@laufire/utils/debug');
const { map, reduce } = require('@laufire/utils/collection');

const getTotalCost = (total, subTask) => total + subTask.totalCost;

// eslint-disable-next-line no-use-before-define
const calcSubTask = (subTask) => calcTask(subTask);

const calcTask = ({ cost = 0, tasks: subTasks = [], ...rest }) => {
	const tasks = map(subTasks, calcSubTask);
	const totalCost = reduce(
		tasks, getTotalCost, cost,
	);

	return { cost, ...rest, tasks, totalCost };
};

const display = (data) => {
	// eslint-disable-next-line no-magic-numbers
	peek(pretty(data, 2));
};

const task = {
	cost: 10,
	name: 'buildHouse',
	tasks: [
		{
			cost: 5,
			name: 'purchase material',
			tasks: [
				{
					cost: 10,
					name: 'purchase cement',
				},
				{
					cost: 15,
					name: 'purchase steel',
				},
			],
		},
		{
			name: 'invite people',
		},
	],
};
const main = () => {
	display(calcTask(task));
};

main();
