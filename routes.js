const { peek } = require('@laufire/utils/debug');

const getLegDistance = ({ value, distances }) =>
	distances.find((distance) =>
		(distance.start === value.from && distance.end === value.to)
			|| (distance.end === value.from && distance.start === value.to))
		?.distance;

const getTotalDistance = ({ legs, distances }) =>
	legs.reduce((acc, value) => acc + getLegDistance({ value, distances }), 0);

const findLegs = (route) =>
	route.stops.map((stop, index) =>
		({ from: stop, to: route.stops[index + 1] })).slice(0, -1);

const calcDistances = ({ distances, routes }) =>
	routes.map((route) => {
		const legs = findLegs(route);

		return { ...route, distance: getTotalDistance({ legs, distances }) };
	});
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
