/* eslint-disable no-magic-numbers */
const { peek } = require('@laufire/utils/debug');

const getDiscountPrice = ({ itemName, discounts, rates }) =>
	(discounts[itemName] || 0) * rates[itemName] / 100;

const getTaxPrice = ({ itemName, taxes, rates }) =>
	(taxes[itemName] ? taxes[itemName] : 0) * rates[itemName] / 100;

const getUnitPrice = (context) => {
	const { itemName, rates } = context;

	return rates[itemName] - getDiscountPrice(context) + getTaxPrice(context);
};
const getLineItems = (context) =>
	context.purchases.map((product) => ({
		...product,
		value: getUnitPrice({
			...context,
			itemName: product.item,
		}) * product.units,
	}));
const getSum = (context) => getLineItems(context)
	.reduce((accumulator, current) => current.value + accumulator, 0);

const display = (context) => {
	peek(getSum(context));
};
const main = (context) => {
	display(context);
};
const rates = {
	carrot: 10,
	apple: 200,
	guava: 50,
};
const discounts = {
	apple: 10,
};
const taxes = {
	carrot: 5,
	guava: 10,
};
const purchases = [
	{
		item: 'carrot',
		units: 20,
	},
	{
		item: 'apple',
		units: 2,
	},
	{
		item: 'guava',
		units: 1,
	},
];
const context = { rates, discounts, taxes, purchases };

main(context);
