// Write a programme to impact the balances of the given accounts, based on their transactions.
// Print the final balance for all the accounts with account number, name and balance amount.

/* Input */
const accounts = [
	{
		name: 'Aron',
		accountNo: '001',
	},
	{
		name: 'Babu',
		accountNo: '002',
	},
	{
		name: 'Chandra',
		accountNo: '003',
	},
];
const balances = {
	'001': 5000,
	'002': 2000,
	'003': 0,
};
const transactions = [
	{
		accountNo: '001',
		type: 'withdrawal',
		amount: 1000,
	},
	{
		accountNo: '001',
		type: 'deposit',
		amount: 500,
	},
	{
		accountNo: '001',
		type: 'withdrawal',
		amount: 1000,
	},
	{
		accountNo: '002',
		type: 'deposit',
		amount: 300,
	},
	{
		accountNo: '002',
		type: 'withdrawal',
		amount: 200,
	},
	{
		accountNo: '003',
		type: 'deposit',
		amount: 200,
	},
];
// eslint-disable-next-line no-shadow
const updateBalances = (balances, transactions) => {
	transactions.map((transaction) => {
		transaction.type === 'withdrawal'
			? balances[transaction.accountNo] -= transaction.amount
			: balances[transaction.accountNo] += transaction.amount;
	});
	return balances;
};

// eslint-disable-next-line no-shadow
const updateAccounts = (balances, accounts) => accounts.map((account) =>
	({ ...account, balance: balances[account.accountNo] }));

const displayBalances = (balance) => {
	// eslint-disable-next-line no-console
	console.table(balance);
};

const main = () => {
	// eslint-disable-next-line no-console
	console.log('Balances before transactions');
	const oldAccBalances = updateAccounts(balances, accounts);

	displayBalances(oldAccBalances);
	const updatedBalances = updateBalances(balances, transactions);

	// eslint-disable-next-line no-console
	console.log('Balances after transactions');
	const newAccBalances = updateAccounts(updatedBalances, accounts);

	displayBalances(newAccBalances);
};

main();
