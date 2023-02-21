const { peek } = require('@laufire/utils/debug');

const getLegDistance = ({ leg: { from, to }, distances }) =>
	distances.find(({ start, end }) =>
		(start === from && end === to) || (start === to && end === from))
		?.distance;

const findLegs = ({ stops }) =>
	stops.map((stop, index) =>
		({ from: stop, to: stops[index + 1] })).slice(0, -1);

const getDistance = ({ route, distances }) =>
	findLegs(route).reduce((acc, leg) =>
		acc + getLegDistance({ leg, distances }), 0);

const calcDistances = ({ distances, routes }) =>
	routes.map((route) =>
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
