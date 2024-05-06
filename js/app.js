
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

