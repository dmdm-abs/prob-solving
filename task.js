const { peek, pretty } = require('@laufire/utils/debug');

const calcTask = ({ cost = 0, tasks: subTasks = [], ...task }) => {
	const tasks = subTasks.map((subTask) => calcTask(subTask));
	const totalCost = tasks.reduce((total, subTask) =>
		total + subTask.totalCost, cost);

	return { cost, ...task, tasks, totalCost };
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
