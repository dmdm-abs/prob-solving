const operation = {
	add: ([operandOne, operandTwo]) => operandOne + operandTwo,
	sub: ([operandOne, operandTwo]) => operandOne - operandTwo,
	mul: ([operandOne, operandTwo]) => operandOne * operandTwo,
	div: ([operandOne, operandTwo]) => operandOne / operandTwo,
};

const operations = (operator, data) =>
	operation[operator](data);

module.exports = operations;
