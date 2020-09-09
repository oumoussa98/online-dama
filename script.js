/***
 ** all of my global variables
 **
 ***/
////
let canEat = false;

/****
 ** all of my functions here
 **
 *****/
// remove event
const remove_event_listeners = (nodes) => {
	nodes.forEach((node) => {
		let newNode = node.cloneNode();
		node.parentNode.replaceChild(newNode, node);
	});
};
//
const can_eat = (playerXY, enemy, enemy_id) => {
	let playerX = parseInt(playerXY[0]);
	let playerY = parseInt(playerXY[2]);
	for (let i = 0; i < enemy.length; i++) {
		let elXY = enemy[i].getAttribute(enemy_id);
		let elX = parseInt(elXY[0]);
		let elY = parseInt(elXY[2]);
		if (enemy_id === "data-player-2") {
			if (
				playerX === elX - 1 &&
				(playerY === elY - 1 || playerY === elY + 1)
			) {
				if (playerX + playerY === elX + elY) {
					let query = `[data-player-2="${elX + 1}/${elY - 1}"]`;
					let taken_1 = document.querySelector(query);
					query = `[data-player-1="${elX + 1}/${elY - 1}"]`;
					let taken_2 = document.querySelector(query);
					if (!taken_1 && !taken_2) {
						return true;
					}
				}
				if (playerX + playerY === elX + elY - 2) {
					let query = `[data-player-2="${elX + 1}/${elY + 1}"]`;
					let taken_1 = document.querySelector(query);
					query = `[data-player-1="${elX + 1}/${elY + 1}"]`;
					let taken_2 = document.querySelector(query);
					if (!taken_1 && !taken_2) {
						return true;
					}
				}
				return false;
			}
		} else if (enemy_id === "data-player-1") {
			if (
				playerX === elX + 1 &&
				(playerY === elY - 1 || playerY === elY + 1)
			) {
				if (playerX + playerY === elX + elY) {
					let query = `[data-player-1="${elX - 1}/${elY + 1}"]`;
					let taken_1 = document.querySelector(query);
					query = `[data-player-2="${elX - 1}/${elY + 1}"]`;
					let taken_2 = document.querySelector(query);

					if (!taken_1 && !taken_2) {
						return true;
					}
				}
				if (playerX + playerY === elX + elY + 2) {
					let query = `[data-player-1="${elX - 1}/${elY - 1}"]`;
					let taken_1 = document.querySelector(query);
					query = `[data-player-2="${elX - 1}/${elY - 1}"]`;
					let taken_2 = document.querySelector(query);

					if (!taken_1 && !taken_2) {
						return true;
					}
				}
				return false;
			}
		}
	}
	return false;
};
// const addAttributes = (items, attribute) => {
// 	let j = 2;
// 	let i = 1;
// 	let iterations = 0;
// 	if (attribute === "data-player-2") {
// 		i = 6;
// 		j = 1;
// 	}
// 	if (attribute === "data-player-1") {
// 		i = 1;
// 		j = 2;
// 	}
// 	items.forEach((item) => {
// 		item.setAttribute(attribute, `${i}/${j}`);
// 		j = j + 2;
// 		if ((j - 3) % 4 === 0) {
// 			i++;
// 			j = 2;
// 			if (iterations === 1) {
// 				j = 1;
// 				iterations--;
// 			} else {
// 				iterations++;
// 			}
// 		}
// 	});
// };
// ================
const start = (tour) => {
	const board = document.querySelectorAll(".active");
	const player_1 = document.querySelectorAll(".top");
	const player_2 = document.querySelectorAll(".bottom");
	if (tour === "player_1") {
		player_1.forEach((play) => {
			// while (true) {}
			play.addEventListener("click", (e) => {
				let player = e.target;
				let playerXY = e.target.getAttribute("data-player-1");
				board.forEach((el) => {
					el.addEventListener("click", (e) => {
						let boardXY = e.target.getAttribute("data-board");
						playerXY = player.getAttribute("data-player-1");
						// console.log(typeof boardXY[0].parseInt());
						if (
							parseInt(boardXY[0]) ===
								parseInt(playerXY[0]) + 1 &&
							(parseInt(boardXY[2]) ===
								parseInt(playerXY[2]) + 1 ||
								parseInt(boardXY[2]) ===
									parseInt(playerXY[2]) + -1)
						) {
							console.log(
								can_eat(playerXY, player_2, "data-player-2")
							);
							player.style.gridArea = boardXY;
							player.setAttribute("data-player-1", boardXY);
							remove_event_listeners(player_1);
							remove_event_listeners(board);
							start("player_2");
						}
					});
				});
			});
		});
	}
	if (tour === "player_2") {
		player_2.forEach((play2) => {
			play2.addEventListener("click", (e) => {
				let player = e.target;
				let playerXY = player.getAttribute("data-player-2");
				board.forEach((el2) => {
					el2.addEventListener("click", (e) => {
						let boardXY = e.target.getAttribute("data-board");
						playerXY = player.getAttribute("data-player-2");
						// console.log(typeof boardXY[0].parseInt());
						if (
							parseInt(boardXY[0]) ===
								parseInt(playerXY[0]) - 1 &&
							(parseInt(boardXY[2]) ===
								parseInt(playerXY[2]) + 1 ||
								parseInt(boardXY[2]) ===
									parseInt(playerXY[2]) + -1)
						) {
							console.log(
								can_eat(playerXY, player_1, "data-player-1")
							);
							player.style.gridArea = boardXY;
							player.setAttribute("data-player-2", boardXY);
							remove_event_listeners(player_2);
							remove_event_listeners(board);
							start("player_1");
						}
					});
				});
			});
		});
	}
};

/***
 ** all of my statements
 **
 ***/
// addAttributes(board, "data-board");
// addAttributes(player_1, "data-player-1");
// addAttributes(player_2, "data-player-2");

start("player_1");
