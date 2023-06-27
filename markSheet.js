/* eslint-disable id-length */
/* eslint-disable no-magic-numbers */
/* eslint-disable complexity */
const csvToJson = require('csvtojson');

const standardizeMarkSheets = (markSheets) =>
	markSheets.map((markSheet) => {
		const { tamil, english, maths, science, social } = markSheet;

		return {
			...markSheet,
			tamil: +tamil,
			english: +english,
			maths: +maths,
			science: +science,
			social: +social,
		};
	});

const calcTotal = (markSheets) => markSheets.map((markSheet) => {
	const { tamil, english, maths, science, social } = markSheet;

	return {
		...markSheet,
		total: tamil + english + maths + science + social,
	};
});

const calcResult = (markSheets) =>
	markSheets.map((markSheet) => {
		const { tamil, english, maths, science, social } = markSheet;
		const isPassed = (tamil > 35) && (english > 35)
    && (maths > 35) && (science > 35) && (social > 35);

		return { ...markSheet, result: isPassed ? 'Pass' : 'Fail' };
	});

const getFailedMarkSheets = (markSheets) =>
	markSheets.filter(({ result }) => result === 'Fail');

const sortPassedMarkSheets = (markSheets) =>
	[...markSheets].sort((a, b) => b.total - a.total);

const getPassedMarkSheets = (markSheets) =>
	markSheets.filter(({ result }) => result === 'Pass');

// eslint-disable-next-line max-lines-per-function
const genRankedMarkSheets = (markSheets) => {
	const passedMarkSheets = getPassedMarkSheets(markSheets);
	const sortedPassedMarkSheets = sortPassedMarkSheets(passedMarkSheets);
	const calcRank = (
		acc, markSheet, key,
	) => [
		...acc,
		{
			...markSheet,
			rank: key === 0
				? 1
				: acc[key - 1].total === markSheet.total
					? acc[key - 1].rank
					: key + 1,
		},
	];

	const rankedMarkSheets = sortedPassedMarkSheets.reduce(calcRank, []);
	const failedMarkSheets = getFailedMarkSheets(markSheets)
		.map((studentData) => ({ ...studentData, rank: '-' }));

	return [...rankedMarkSheets, ...failedMarkSheets];
};

const processMarkSheets = (markSheets) =>
	genRankedMarkSheets(calcResult(calcTotal(markSheets)));

const displayAsTable = (data) => {
	// eslint-disable-next-line no-console
	console.table(data);
};
const main = async () => {
	const markSheets = await csvToJson().fromFile('./data.csv');
	const standardizedMarkSheets = standardizeMarkSheets(markSheets);
	const processedMarkSheets = processMarkSheets(standardizedMarkSheets);

	displayAsTable(processedMarkSheets);
};

main();
