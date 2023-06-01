const operation = {
	add: ([operandOne, operandTwo]) => operandOne + operandTwo,
	sub: ([operandOne, operandTwo]) => operandOne - operandTwo,
	mul: ([operandOne, operandTwo]) => operandOne * operandTwo,
	div: ([operandOne, operandTwo]) => operandOne / operandTwo,
};

const operations = (operator, ...data) => {
	try {
		return operation[operator](data);
	}
	catch (error) {
		return error;
	}
};

module.exports = operations;
