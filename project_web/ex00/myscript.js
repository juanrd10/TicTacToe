var array = [
	[0, 0, 0],
	[0, 0, 0],
	[0, 0, 0]
];
const difficuly = 'hard';
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

function play1_vs_1(){
	document.querySelectorAll('td').forEach(item => {
		item.addEventListener('click', event => {
			coordinates = item.id.split('.');
			if (array[coordinates[0]][coordinates[1]] == 0 && click) {
				array[coordinates[0]][coordinates[1]] = turn;
				item.classList += "clicked";
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

function intelligent_move() {
	if (difficuly == 'easy') {
		return getRandomPosition();
	} else {
		for (var x = 0; x < 3; x ++) {
			count = 0;
			array[x].forEach(function(i) {
				if (i == 'X')
					count++;
			});
			if (count == 2) {
				if (array[x][0] != 'X' && array[x][0] != 'O')
					return [x, 0];
				if (array[x][1] != 'X' && array[x][1] != 'O')
					return [x, 1];
				if (array[x][2] != 'X' && array[x][2] != 'O')
					return [x, 2];
			}
		}
		for (var y = 0; y < 3; y ++) {
			count = 0;
			array2 = [array[0][y], array[1][y], array[2][y]]
			array2.forEach(function(i) {
				if (i == 'X')
					count++;
			});
			if (count == 2) {
				if (array[0][y] != 'X' && array[0][y] != 'O')
					return [0, y];
				if (array[1][y] != 'X' && array[1][y] != 'O')
					return [1, y];
				if (array[2][y] != 'X' && array[2][y] != 'O')
					return [2, y];
			}
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
	if (checkWinner(move[0], move[1]) == 1) {
		document.querySelector('h1').removeAttribute('hidden');
		document.getElementById('winner').innerHTML = turn;
		document.querySelector('p').setAttribute('hidden', 'true');
		document.getElementById('retry').removeAttribute('hidden');
		click = false;
	} else if (checkWinner(move[0], move[1]) == 2) {
		document.querySelector('h1').removeAttribute('hidden');
		document.getElementById('winner').innerHTML = "none";
		document.querySelector('p').setAttribute('hidden', 'true');
		document.getElementById('retry').removeAttribute('hidden');
		click = false;
	}
	turn = 'X';
}

function play_ia(){
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
					click = false;
				} else if (checkWinner(coordinates[0], coordinates[1]) == 2) {
					document.querySelector('h1').removeAttribute('hidden');
					document.getElementById('winner').innerHTML = "none";
					document.querySelector('p').setAttribute('hidden', 'true');
					document.getElementById('retry').removeAttribute('hidden');
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
	play1_vs_1();
});

document.getElementById('play_ia').addEventListener('click', event => {
	document.getElementById('play').setAttribute('hidden', 'true');
	document.getElementById('play_ia').setAttribute('hidden', 'true');
	document.querySelector('table').removeAttribute('hidden');
	document.getElementById('turn').innerHTML = turn;
	document.querySelector('p').removeAttribute('hidden');
	play_ia();
});


document.getElementById('retry').addEventListener('click', event => {
	location.reload();
});

