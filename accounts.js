const { peek } = require('@laufire/utils/debug');

const doTransactions = ({ balances, transactions }) => {
	const currentBalances = { ...balances };

	transactions.map(({ type, accountNo, amount }) => {
		type === 'withdrawal'
			? currentBalances[accountNo] -= amount
			: currentBalances[accountNo] += amount;
	});
	return currentBalances;
};

const addBalToAccounts = ({ balances, accounts }) =>
	accounts.map((account) =>
		({ ...account, balance: balances[account.accountNo] }));

const displayBalances = (balance) => {
	// eslint-disable-next-line no-console
	console.table(balance);
};

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
const main = () => {
	peek('Balances before transactions');
	const oldAccBalances = addBalToAccounts({ balances, accounts });

	displayBalances(oldAccBalances);
	const updatedBalances = doTransactions({ balances, transactions });

	peek('Balances after transactions');
	const newAccBalances = addBalToAccounts({
		balances: updatedBalances,
		accounts: accounts,
	});

	peek(balances);

	displayBalances(newAccBalances);
};

main();
