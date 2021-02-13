var array = [
	[0, 0, 0],
	[0, 0, 0],
	[0, 0, 0]
];
var difficuly = 'hard';
var click = true;
var turn = 'X'
var start = 'O'

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

function play1_vs_1(){
	document.querySelectorAll('td').forEach(item => {
		item.addEventListener('click', event => {
			coordinates = item.id.split('.');
			if (array[coordinates[0]][coordinates[1]] == 0 && click) {
				array[coordinates[0]][coordinates[1]] = turn;
				item.classList += "clicked";
				item.innerHTML += "<p id='clicked'>" + turn + "</p>"
				winner = checkWinner(coordinates[0], coordinates[1]);
				if (winner != 0) {
					document.querySelector('h1').removeAttribute('hidden');
					if (winner == 1)
						document.getElementById('winner').innerHTML = turn;
					else if (winner == 2)
						document.getElementById('winner').innerHTML = "none";
					document.querySelector('p').setAttribute('hidden', 'true');
					document.getElementById('retry').removeAttribute('hidden');
					document.getElementById('turn-text').setAttribute('hidden', 'true');

					click = false;
				}
				turn = turn == 'X' ? 'O' : 'X';
				document.getElementById('turn').innerHTML = turn;
			}
		});
	});
}

function getRandomPosition() {
	rand1 = 1
	rand2 = 1
	while (array[rand1][rand2] != 0){
		rand1 = Math.floor(Math.random() * 3)
		rand2 = Math.floor(Math.random() * 3)
	}
	return [rand1, rand2];
}

function allRandomPosition() {
	rand1 = Math.floor(Math.random() * 3)
	rand2 = Math.floor(Math.random() * 3)
	while (array[rand1][rand2] != 0){
		rand1 = Math.floor(Math.random() * 3)
		rand2 = Math.floor(Math.random() * 3)
	}
	return [rand1, rand2];
}

function can_win(chr)
{
	for (var x = 0; x < 3; x ++) {
		count = 0;
		array[x].forEach(function(i) {
			if (i == chr)
				count++;
		});
		if (count == 2) {
			if (array[x][0] == 0)
				return [x, 0];
			if (array[x][1] == 0)
				return [x, 1];
			if (array[x][2] == 0)
				return [x, 2];
		}
	}
	for (var y = 0; y < 3; y ++) {
		count = 0;
		array2 = [array[0][y], array[1][y], array[2][y]]
		array2.forEach(function(i) {
			if (i == chr)
				count++;
		});
		if (count == 2) {
			if (array[0][y] == 0)
				return [0, y];
			if (array[1][y] == 0)
				return [1, y];
			if (array[2][y] == 0)
				return [2, y];
		}
	}
	diag1 = [array[0][0], array[1][1], array[2][2]]
	diag2 = [array[2][0], array[1][1], array[0][2]]
	count = 0;
	diag1.forEach(function(i) {
		if (i == chr)
			count++;
	});
	if (count == 2)
	{
		if (array[0][0] == 0)
			return [0, 0];
		if (array[1][1] == 0)
			return [1, 1];
		if (array[2][2] == 0)
			return [2, 2];
	}
	count = 0;
	diag2.forEach(function(i) {
		if (i == chr)
			count++;
	});
	if (count == 2)
	{
		if (array[2][0] == 0)
			return [2, 0];
		if (array[1][1] == 0)
			return [1, 1];
		if (array[0][2] == 0)
			return [0, 2];
	}
	return null
}


function intelligent_move() {
	if (difficuly == 'easy') {
		return allRandomPosition();
	}
	else {
		nxt_win = can_win('O');
		if (nxt_win != null)
			return (nxt_win);
		nxt_win = can_win('X');
		if (nxt_win != null)
		return (nxt_win);
		if (array[0][0] == 'X' || array[2][2] == 'X')
		{
		if (array[1][1] == 0)
		return [1, 1];
			if (array[0][0] == 0)
				return [0, 0];
			if (array[2][2] == 0)
				return [2, 2];
		}
		if (array[0][2] == 'X' || array[2][0] == 'X')
		{
			if (array[1][1] == 0)
				return [1, 1];
			if (array[0][2] == 0)
				return [0, 2];
			if (array[2][0] == 0)
				return [2, 0];
		}
	}
	return getRandomPosition();
}

function ia_movement(){
	move = intelligent_move();
	item = move[0] + "." + move[1];
	document.getElementById(item).innerHTML = "<p id='clicked'>O</p>"
	document.getElementById(item).classList += "clicked";
	array[move[0]][move[1]] = turn;
	winner = checkWinner(move[0], move[1]);
	if (winner != 0) {
		document.querySelector('h1').removeAttribute('hidden');
		if (winner == 1)
			document.getElementById('winner').innerHTML = turn;
		if (winner == 2)
			document.getElementById('winner').innerHTML = "none";
		document.querySelector('p').setAttribute('hidden', 'true');
		document.getElementById('retry').removeAttribute('hidden');
		document.getElementById('turn-text').setAttribute('hidden', 'true');
		click = false;
	}
	turn = 'X';
}

function play_ia(){
	if (start == 'O') {
		turn = 'O'
		ia_movement();
	}
		document.querySelectorAll('td').forEach(item => {
		item.addEventListener('click', event => {
			coordinates = item.id.split('.');
			if (array[coordinates[0]][coordinates[1]] == 0 && click) {
				array[coordinates[0]][coordinates[1]] = turn;
				item.innerHTML += "<p id='clicked'>X</p>"
				item.classList += "clicked";
				if (checkWinner(coordinates[0], coordinates[1]) == 1) {
					document.querySelector('h1').removeAttribute('hidden');
					document.getElementById('winner').innerHTML = turn;
					document.querySelector('p').setAttribute('hidden', 'true');
					document.getElementById('retry').removeAttribute('hidden');
					document.getElementById('turn-text').setAttribute('hidden', 'true');
					click = false;
				} else if (checkWinner(coordinates[0], coordinates[1]) == 2) {
					document.querySelector('h1').removeAttribute('hidden');
					document.getElementById('winner').innerHTML = "none";
					document.querySelector('p').setAttribute('hidden', 'true');
					document.getElementById('retry').removeAttribute('hidden');
					document.getElementById('turn-text').setAttribute('hidden', 'true');
					click = false;
				} else {
				turn = 'O';
				ia_movement();
				}
			}
		});
	});
}

document.getElementById('play').addEventListener('click', event => {
	document.getElementById('play').setAttribute('hidden', 'true');
	document.getElementById('play_ia').setAttribute('hidden', 'true');
	document.querySelector('table').removeAttribute('hidden');
	document.getElementById('turn').innerHTML = turn;
	document.querySelector('p').removeAttribute('hidden');
	document.getElementById('turn-text').removeAttribute('hidden');
	document.getElementById('turns').setAttribute('hidden', 'true');
	document.getElementById('difficulty').setAttribute('hidden', 'true');
	play1_vs_1();
});

document.getElementById('play_ia').addEventListener('click', event => {
	document.getElementById('play').setAttribute('hidden', 'true');
	document.getElementById('play_ia').setAttribute('hidden', 'true');
	document.querySelector('table').removeAttribute('hidden');
	document.getElementById('turn').innerHTML = turn;
	document.querySelector('p').removeAttribute('hidden');
	document.getElementById('turn-text').removeAttribute('hidden');
	document.getElementById('turns').setAttribute('hidden', 'true');
	document.getElementById('difficulty').setAttribute('hidden', 'true');
	start = document.getElementById('first-move').value == 1 ? 'X' : 'O';
	difficuly = document.getElementById('diffic').value == 1 ? 'easy' : 'hard';
	play_ia();
});


document.getElementById('retry').addEventListener('click', event => {
	location.reload();
});

