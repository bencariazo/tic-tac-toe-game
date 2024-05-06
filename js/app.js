const ScreenController = (() => {
	const playerTurnDiv = document.querySelector("#turn");

	const playerTurn = (activePlayerName) => {
		playerTurnDiv.textContent = `It's ${activePlayerName}'s turn`;
	};
	const tieMessage = () => {
		document.querySelector("#message").textContent = `It's a tie!`;
	};

	const winMessage = (activePlayerName) => {
		document.querySelector("#message").textContent = `${activePlayerName} WINS!!!`;
	};

	return {
		winMessage,
		tieMessage,
		playerTurn,
	};
})();

const Gameboard = (() => {
	let board = ["", "", "", "", "", "", "", "", ""];

	const getGameboard = () => board;

	const inputMark = (row, column, player) => {
		const availableCell = board[row][column].getValue() === "-";
		if (!availableCell) return;
		board[row][column].addMark(player);
	};

	// Render board squares
	const render = () => {
		let boardHTML = "";
		board.forEach((square, index) => {
			boardHTML += `<div class="square" id="square-${index}">${square}</div>`;
		});
		document.querySelector("#gameboard").innerHTML = boardHTML;
		const square = document.querySelectorAll(".square");
		square.forEach((square) => {
			square.addEventListener("click", gameController.handleClick);
		});
	};

	const update = (index, value) => {
		board[index] = value;
		render();
	};

	return {
		getGameboard,
		inputMark,
		render,
		update,
	};
})();

const createPlayer = (name, mark) => {
	return {
		name,
		mark,
	};
};

const gameController = (() => {
	const board = Gameboard;
	let gameOver;
	let activePlayer;

	const start = () => {
		players = [
			createPlayer(document.querySelector("#playerOne").value, "X"),
			createPlayer(document.querySelector("#playerTwo").value, "O"),
		];
		activePlayer = players[0];
		gameOver = false;

		Gameboard.render();
		ScreenController.playerTurn(activePlayer.name);
	};

	const handleClick = (event) => {
		if (gameOver) {
			return;
		}
		let index = parseInt(event.target.id.split("-")[1]);

		if (board.getGameboard()[index] !== "") {
			return;
		}
		Gameboard.update(index, activePlayer.mark);
		if (checkWin(board.getGameboard(), activePlayer.mark)) {
			gameOver = true;
			let message = activePlayer.name;
			ScreenController.winMessage(message);
		} else if (checkTie(board.getGameboard())) {
			gameOver = true;
			ScreenController.tieMessage();
		}
		switchPlayer();
		ScreenController.playerTurn(activePlayer.name);
	};

	const switchPlayer = () => {
		activePlayer = activePlayer === players[0] ? players[1] : players[0];
	};

	const getActivePlayer = () => activePlayer;

	const restart = () => {
		for (let i = 0; i < 9; i++) {
			Gameboard.update(i, "");
		}
		Gameboard.render();
		gameOver = false;
		document.querySelector("#message").textContent = "";
		document.querySelector("#turn").textContent = "";
	};

	return {
		start,
		getActivePlayer,
		handleClick,
		restart,
	};
})();

function checkWin(board) {
	const winningCombinations = [
		[0, 1, 2],
		[3, 4, 5],
		[6, 7, 8],
		[0, 3, 6],
		[1, 4, 7],
		[2, 5, 8],
		[0, 4, 8],
		[2, 4, 6],
	];

	for (let i = 0; i < winningCombinations.length; i++) {
		let [a, b, c] = winningCombinations[i];
		if (board[a] && board[a] === board[b] && board[a] === board[c]) {
			return true;
		}
	}
}

function checkTie(board) {
	return board.every((cell) => cell !== "");
}

const restartBtn = document.querySelector("#btn-restart");

restartBtn.addEventListener("click", () => {
	gameController.restart();
});
const startBtn = document.querySelector("#btn-start");

startBtn.addEventListener("click", () => {
	gameController.start();
});
