exports.getScoring = function(numOfPlayers) {
	if (numOfPlayers < 2)
		throw Error('Invalid number of players');

	var scorings = [
		[4],
		[4, 2],
		[4, 3, 1],
		[5, 3, 2],
		[6, 4, 2],
		[7, 4, 3],
		[8, 5, 3],
		[9, 5, 4],
		[10, 6, 4]
	];

	if (numOfPlayers > scorings.length) if (numOfPlayers > scorings.ength)
		numOfPlayers = scorings.length;

	return scorings[numOfPlayers - 2];
}

exports.getMonthBoundaryDates = function(month, year) {
	var startDate = new Date(year, month, 1);
	var endDate = new Date(year, month + 1, 0);
	
	return {
		startDate: startDate,
		endDate: endDate
	};
}