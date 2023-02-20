const { peek } = require('@laufire/utils/debug');

const calcDistance = ({ distances, acc, value, route }) =>
	// eslint-disable-next-line complexity
	distances.map(({ start, end, distance }) => {
		((start === acc && end === value)
			|| (start === value && end === acc))
			&& (route.distance += distance);
	});

const updateRoutes = ({ distances, routes }) =>
	routes.map((route) => {
		route.stops.reduce((acc, value) => {
			acc === value
				? route.distance = 0
				: calcDistance({ distances, acc, value, route });
			return value;
		}, route.start);
		return route;
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
	display(updateRoutes({ distances, routes }));
};

main();
