const { peek } = require('@laufire/utils/debug');
const { map, reduce, find } = require('@laufire/utils/collection');

const getLegDistance = ({ leg: { from, to }, distances }) =>
	find(distances, ({ start, end }) =>
		(start === from && end === to) || (start === to && end === from))
		?.distance;

const findLegs = ({ stops }) =>
	map(stops, (stop, index) =>
		({ from: stop, to: stops[index + 1] })).slice(0, -1);

const getDistance = ({ route, distances }) =>
	reduce(
		findLegs(route), (acc, leg) =>
			acc + getLegDistance({ leg, distances }), 0,
	);

const calcDistances = ({ distances, routes }) =>
	map(routes, (route) =>
		({ ...route, distance: getDistance({ route, distances }) }));

const display = (routes) => {
	peek(routes);
};

const distances = [
	{
		start: 'chennai',
		end: 'villupuram',
		distance: 166,
	},
	{
		start: 'villupuram',
		end: 'trichy',
		distance: 165,
	},
	{
		start: 'trichy',
		end: 'madurai',
		distance: 138,
	},
	{
		start: 'madurai',
		end: 'tirunelveli',
		distance: 85,
	},
	{
		start: 'trichy',
		end: 'karur',
		distance: 83,
	},
];
const routes = [
	{
		start: 'chennai',
		stop: 'trichy',
		stops: ['chennai', 'villupuram', 'trichy'],
	},
	{
		start: 'chennai',
		stop: 'karur',
		stops: ['chennai', 'villupuram', 'trichy', 'karur'],
	},
	{
		start: 'trichy',
		stop: 'tirunelveli',
		stops: ['trichy', 'madurai', 'tirunelveli'],
	},
	{
		start: 'tirunelveli',
		stop: 'trichy',
		stops: ['tirunelveli', 'madurai', 'trichy'],
	},
];

const main = () => {
	display(calcDistances({ distances, routes }));
};

main();
