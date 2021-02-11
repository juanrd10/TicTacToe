var array = [
	[0, 0, 0],
	[0, 0, 0],
	[0, 0, 0]
];
var click = true;
var turn = 'X'

function checkWinner(x, y) {
	for (var i = 0; i < 3; i++) {
		if (array[x][i] != turn)
			break ;
		if (i == 2)
			return 1;
	}

	for (var i = 0; i < 3; i++) {
		if (array[i][y] != turn)
			break ;
		if (i == 2)
			return 1;
	}

	for (var i = 0; i < 3; i++) {
		if (array[i][i] != turn)
			break ;
		if (i == 2)
			return 1;
	}

	for (var i = 0; i < 3; i++) {
		if (array[i][2 - i] != turn)
			break ;
		if (i == 2)
			return 1;
	}

	for (var i = 0; i < 3; i++) {
		for (var j = 0; j < 3; j++) {
			if (array[i][j] == 0)
				return 0;
		}
	}
	return 2;
}

document.getElementById('play').addEventListener('click', event => {
	document.getElementById('play').setAttribute('hidden', 'true');
	document.querySelector('table').removeAttribute('hidden');
	document.getElementById('turn').innerHTML = turn;
	document.querySelector('p').removeAttribute('hidden');
});

document.getElementById('retry').addEventListener('click', event => {
	location.reload();
});

document.querySelectorAll('td').forEach(item => {
	item.addEventListener('click', event => {
		coordinates = item.id.split('.');
		if (array[coordinates[0]][coordinates[1]] == 0 && click) {
			array[coordinates[0]][coordinates[1]] = turn;
			item.innerHTML += "<p id='clicked'>" + turn + "</p>"
			if (checkWinner(coordinates[0], coordinates[1]) == 1) {
				document.querySelector('h1').removeAttribute('hidden');
				document.getElementById('winner').innerHTML = turn;
				document.querySelector('p').setAttribute('hidden', 'true');
				document.getElementById('retry').removeAttribute('hidden');
				click = false;
			} else if (checkWinner(coordinates[0], coordinates[1]) == 2) {
				document.querySelector('h1').removeAttribute('hidden');
				document.getElementById('winner').innerHTML = "none";
				document.querySelector('p').setAttribute('hidden', 'true');
				document.getElementById('retry').removeAttribute('hidden');
				click = false;
			}
			turn = turn == 'X' ? 'O' : 'X';
			document.getElementById('turn').innerHTML = turn;
		}
	});
});
