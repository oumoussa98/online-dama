/****
 ** all of my functions here
 **
 *****/
const remove_event_listeners = (nodes) => {
	nodes = document.querySelectorAll(nodes);
	nodes.forEach((node) => {
		node.onclick = () => null;
	});
};
const eat = (monster, elToEat, newGridArea, monsterAttr) => {
	let className = monster.getAttribute("class");
	let i = className.indexOf(" ");
	className = className.slice(0, i);
	monster = document.querySelector("." + className);
	className = elToEat.getAttribute("class");
	i = className.indexOf(" ");
	className = className.slice(0, i);
	elToEat = document.querySelector("." + className);
	monster.style.gridArea = newGridArea;
	monster.setAttribute(monsterAttr, newGridArea);
	elToEat.remove();
};
// check if a player can eat an element
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
				if (elX === 8 || elX === 1 || elY === 1 || elY === 8) {
					return false;
				} else if (playerX + playerY === elX + elY) {
					let query = `[data-player-2="${elX + 1}/${elY - 1}"]`;
					let taken_1 = document.querySelector(query);
					query = `[data-player-1="${elX + 1}/${elY - 1}"]`;
					let taken_2 = document.querySelector(query);
					if (!taken_1 && !taken_2) {
						return {
							enemy: enemy[i],
							xy: `${elX + 1}/${elY - 1}`,
						};
					}
				} else if (playerX + playerY === elX + elY - 2) {
					let query = `[data-player-2="${elX + 1}/${elY + 1}"]`;
					let taken_1 = document.querySelector(query);
					query = `[data-player-1="${elX + 1}/${elY + 1}"]`;
					let taken_2 = document.querySelector(query);
					if (!taken_1 && !taken_2) {
						return {
							enemy: enemy[i],
							xy: `${elX + 1}/${elY + 1}`,
						};
					}
				}
			}
		} else if (enemy_id === "data-player-1") {
			if (
				playerX === elX + 1 &&
				(playerY === elY - 1 || playerY === elY + 1)
			) {
				if (elX === 8 || elX === 1 || elY === 1 || elY === 8) {
					return false;
				} else if (playerX + playerY === elX + elY) {
					let query = `[data-player-1="${elX - 1}/${elY + 1}"]`;
					let taken_1 = document.querySelector(query);
					query = `[data-player-2="${elX - 1}/${elY + 1}"]`;
					let taken_2 = document.querySelector(query);
					if (!taken_1 && !taken_2) {
						return {
							enemy: enemy[i],
							xy: `${elX - 1}/${elY + 1}`,
						};
					}
				} else if (playerX + playerY === elX + elY + 2) {
					let query = `[data-player-1="${elX - 1}/${elY - 1}"]`;
					let taken_1 = document.querySelector(query);
					query = `[data-player-2="${elX - 1}/${elY - 1}"]`;
					let taken_2 = document.querySelector(query);

					if (!taken_1 && !taken_2) {
						return {
							enemy: enemy[i],
							xy: `${elX - 1}/${elY - 1}`,
						};
					}
				}
			}
		}
	}
	return false;
};
const check_if_there_is_an_element_to_eat = (attr) => {
	let el;
	if (attr === "data-player-1") el = document.querySelectorAll(".player-1");
	if (attr === "data-player-2") el = document.querySelectorAll(".player-2");
	for (let i = 0; i < el.length; i++) {
		if (attr === "data-player-1") {
			let elxy = el[i].getAttribute(attr);
			let elX = parseInt(elxy[0]);
			let elY = parseInt(elxy[2]);
			let query = `[data-player-2="${elX + 1}/${elY - 1}"]`;
			let exist_1 = document.querySelector(query);
			query = `[data-player-2="${elX + 1}/${elY + 1}"]`;
			let exist_2 = document.querySelector(query);
			if (exist_1) {
				let enemyElements = document.querySelectorAll(".player-2");
				let { enemy, xy: el_xy } = can_eat(
					elxy,
					enemyElements,
					"data-player-2"
				);
				if (el_xy && enemy) {
					return {
						el: el[i],
						el_xy,
					};
				}
			} else if (exist_2) {
				let enemyElements = document.querySelectorAll(".player-2");
				let { enemy, xy: el_xy } = can_eat(
					elxy,
					enemyElements,
					"data-player-2"
				);
				if (el_xy && enemy) {
					return {
						el: el[i],
						el_xy,
					};
				}
			}
		}
		if (attr === "data-player-2") {
			let elxy = el[i].getAttribute(attr);
			let elX = parseInt(elxy[0]);
			let elY = parseInt(elxy[2]);
			let query = `[data-player-1="${elX - 1}/${elY - 1}"]`;
			let exist_1 = document.querySelector(query);
			query = `[data-player-1="${elX - 1}/${elY + 1}"]`;
			let exist_2 = document.querySelector(query);
			if (exist_1) {
				let enemyElements = document.querySelectorAll(".player-1");
				let { enemy, xy: el_xy } = can_eat(
					elxy,
					enemyElements,
					"data-player-1"
				);
				if (el_xy && enemy) {
					return {
						el: el[i],
						el_xy,
					};
				}
			} else if (exist_2) {
				let enemyElements = document.querySelectorAll(".player-1");
				let { enemy, xy: el_xy } = can_eat(
					elxy,
					enemyElements,
					"data-player-1"
				);
				if (el_xy && enemy) {
					return {
						el: el[i],
						el_xy,
					};
				}
			}
		}
	}
	return false;
};
const can_eat_multiple = (player, attr) => {
	let className = player.getAttribute("class");
	let i = className.indexOf(" ");
	className = className.slice(0, i);
	player = document.querySelector("." + className);
	let playerXY = player.getAttribute(attr);
	if (attr === "data-player-1") {
		let player_2 = document.querySelectorAll(".player-2");
		let { enemy, xy } = can_eat(playerXY, player_2, "data-player-2");
		if (enemy && xy) {
			remove_event_listeners(".player-1");
			remove_event_listeners(".player-2");
			let x = parseInt(xy[0]);
			let y = parseInt(xy[2]);
			let query = `[data-board="${x}/${y}"]`;
			let board = document.querySelector(query);
			return {
				board,
				enemy,
				xy,
			};
		}
		return false;
	}
	if (attr === "data-player-2") {
		let player_1 = document.querySelectorAll(".player-1");
		let { enemy, xy } = can_eat(playerXY, player_1, "data-player-1");
		if (enemy && xy) {
			remove_event_listeners(".player-2");
			remove_event_listeners(".player-1");
			let x = parseInt(xy[0]);
			let y = parseInt(xy[2]);
			let query = `[data-board="${x}/${y}"]`;
			let board = document.querySelector(query);
			return {
				board,
				enemy,
				xy,
			};
		}
		return false;
	}
	return false;
};
const eat_multiple = (monster, elToEat, newGridArea, monsterAttr) => {
	eat(monster, elToEat, newGridArea, monsterAttr);
	let { board, enemy, xy } = can_eat_multiple(monster, monsterAttr);
	if (board && enemy && xy) {
		board.onclick = () => {
			eat_multiple(monster, enemy, xy, monsterAttr);
		};
	}
};
const can_move = (element, attr) => {
	const elementXY = element.getAttribute(attr);
	const elementX = parseInt(elementXY[0]);
	const elementY = parseInt(elementXY[2]);
	if (elementY === 1 && attr === "data-player-1") {
		let query = `[data-player-2="${elementX + 1}/${elementY + 1}"]`;
		let taken1 = document.querySelector(query);
		if (taken1) return false;
		query = `[data-player-1="${elementX + 1}/${elementY + 1}"]`;
		let taken2 = document.querySelector(query);
		if (taken2) return false;
		if (!taken2 && !taken1) return true;
	} else if (elementY === 8 && attr === "data-player-1") {
		let query = `[data-player-2="${elementX + 1}/${elementY - 1}"]`;
		let taken1 = document.querySelector(query);
		if (taken1) return false;
		query = `[data-player-1="${elementX + 1}/${elementY - 1}"]`;
		let taken2 = document.querySelector(query);
		if (taken2) return false;
		if (!taken2 && !taken1) return true;
	} else if (elementY === 1 && attr === "data-player-2") {
		let query = `[data-player-2="${elementX - 1}/${elementY + 1}"]`;
		let taken1 = document.querySelector(query);
		if (taken1) return false;
		query = `[data-player-1="${elementX - 1}/${elementY + 1}"]`;
		let taken2 = document.querySelector(query);
		if (taken2) return false;
		if (!taken2 && !taken1) return true;
	} else if (elementY === 8 && attr === "data-player-2") {
		let query = `[data-player-2="${elementX - 1}/${elementY - 1}"]`;
		let taken1 = document.querySelector(query);
		if (taken1) return false;
		query = `[data-player-1="${elementX - 1}/${elementY - 1}"]`;
		let taken2 = document.querySelector(query);
		if (taken2) return false;
		if (!taken2 && !taken1) return true;
	} else {
		if (attr === "data-player-1") {
			let query = `[data-player-2="${elementX + 1}/${elementY - 1}"]`;
			let taken1 = document.querySelector(query);
			query = `[data-player-1="${elementX + 1}/${elementY - 1}"]`;
			let taken2 = document.querySelector(query);
			query = `[data-player-2="${elementX + 1}/${elementY + 1}"]`;
			let taken3 = document.querySelector(query);
			query = `[data-player-1="${elementX + 1}/${elementY + 1}"]`;
			let taken4 = document.querySelector(query);
			if ((taken1 || taken2) && (taken3 || taken4)) return false;
			if ((taken1 || taken2) && !(taken3 || taken4))
				return {
					elX: elementX + 1,
					elY: elementY + 1,
				};
			if (!(taken1 || taken2) && (taken3 || taken4))
				return {
					elX: elementX + 1,
					elY: elementY - 1,
				};
			if (!(taken1 || taken2) && !(taken3 || taken4)) return true;
			console.error("something went wrong in can_move function !!");
		}
		if (attr === "data-player-2") {
			let query = `[data-player-2="${elementX - 1}/${elementY - 1}"]`;
			let taken1 = document.querySelector(query);
			query = `[data-player-1="${elementX - 1}/${elementY - 1}"]`;
			let taken2 = document.querySelector(query);
			query = `[data-player-2="${elementX - 1}/${elementY + 1}"]`;
			let taken3 = document.querySelector(query);
			query = `[data-player-1="${elementX - 1}/${elementY + 1}"]`;
			let taken4 = document.querySelector(query);
			if ((taken1 || taken2) && (taken3 || taken4)) return false;
			if ((taken1 || taken2) && !(taken3 || taken4))
				return {
					elX: elementX - 1,
					elY: elementY + 1,
				};
			if (!(taken1 || taken2) && (taken3 || taken4))
				return {
					elX: elementX - 1,
					elY: elementY - 1,
				};
			if (!(taken1 || taken2) && !(taken3 || taken4)) return true;
			console.error("something went wrong in can_move function !!");
		}
	}
	console.error("something went wrong in can_move function !!");
};
const move = (el, newGridArea, attr) => {
	el.style.gridArea = newGridArea;
	el.setAttribute(attr, newGridArea);
};
const removeEl = (el) => {
	let className = el.getAttribute("class");
	let i = className.indexOf(" ");
	className = className.slice(0, i);
	el = document.querySelector("." + className);
	el.remove();
};
const player1 = () => {
	let player = null;
	let playerXY = null;
	let actives;
	let player_1 = document.querySelectorAll(".player-1");
	player_1.forEach((el) => {
		el.onclick = (e) => {
			player = e.target;
			playerXY = e.target.getAttribute("data-player-1");
			let player_2 = document.querySelectorAll(".player-2");
			let { enemy, xy } = can_eat(playerXY, player_2, "data-player-2");
			if (enemy && xy) {
				actives = document.querySelectorAll(".active");
				actives.forEach((active) => {
					active.onclick = (e) => {
						activeXY = e.target.getAttribute("data-board");
						if (activeXY === xy) {
							eat(player, enemy, xy, "data-player-1");
							let {
								board,
								enemy: enemy2,
								xy: xy2,
							} = can_eat_multiple(player, "data-player-1");
							if (board && enemy2 && xy2) {
								remove_event_listeners(".active");
								board.onclick = () => {
									remove_event_listeners(".active");
									remove_event_listeners(".player-1");
									eat_multiple(
										player,
										enemy2,
										xy2,
										"data-player-1"
									);
									player2();
								};
								remove_event_listeners(".player-1");
								return;
							}
							remove_event_listeners(".active");
							remove_event_listeners(".player-1");
							player2();
							return;
						}
						let { elX, elY } = can_move(player, "data-player-1");
						if (elX && elY) {
							if (activeXY === `${elX}/${elY}`) {
								player.style.gridArea = xy;
								setTimeout(() => {
									player.remove();
									remove_event_listeners(".active");
									remove_event_listeners(".player-1");
									player2();
									return;
								}, 250);
							} else {
								remove_event_listeners(".active");
								remove_event_listeners(".player-1");
								player1();
								return;
							}
						} else {
							remove_event_listeners(".active");
							remove_event_listeners(".player-1");
							player1();
							return;
						}
					};
				});
				return;
			} else if (!enemy && !xy && can_move(player, "data-player-1")) {
				actives = document.querySelectorAll(".active");
				actives.forEach((active) => {
					active.onclick = (e) => {
						activeXY = e.target.getAttribute("data-board");
						if (
							parseInt(activeXY[0]) ===
								parseInt(playerXY[0]) + 1 &&
							(parseInt(activeXY[2]) ===
								parseInt(playerXY[2]) + 1 ||
								parseInt(activeXY[2]) ===
									parseInt(playerXY[2]) - 1)
						) {
							let {
								el,
								el_xy,
							} = check_if_there_is_an_element_to_eat(
								"data-player-1"
							);
							if (el && el_xy) {
								el.style.gridArea = el_xy;
								setTimeout(() => {
									removeEl(el);
								}, 250);
							}
							move(player, activeXY, "data-player-1");
							remove_event_listeners(".active");
							remove_event_listeners(".player-1");
							player2();
							return;
						} else {
							remove_event_listeners(".active");
							remove_event_listeners(".player-1");
							player1();
							return;
						}
					};
				});
				return;
			}
		};
	});
};
const player2 = () => {
	let player = null;
	let playerXY = null;
	let actives;
	let player_2 = document.querySelectorAll(".player-2");
	player_2.forEach((el) => {
		el.onclick = (e) => {
			player = e.target;
			playerXY = e.target.getAttribute("data-player-2");
			let player_1 = document.querySelectorAll(".player-1");
			let { enemy, xy } = can_eat(playerXY, player_1, "data-player-1");
			if (enemy && xy) {
				actives = document.querySelectorAll(".active");
				actives.forEach((active) => {
					active.onclick = (e) => {
						activeXY = e.target.getAttribute("data-board");
						if (activeXY === xy) {
							eat(player, enemy, xy, "data-player-2");
							let {
								board,
								enemy: enemy2,
								xy: xy2,
							} = can_eat_multiple(player, "data-player-2");
							if (board && enemy2 && xy2) {
								remove_event_listeners(".active");
								board.onclick = () => {
									remove_event_listeners(".player-2");
									remove_event_listeners(".active");
									eat_multiple(
										player,
										enemy2,
										xy2,
										"data-player-2"
									);
									player1();
								};
								remove_event_listeners(".player-2");
								return;
							}
							remove_event_listeners(".player-2");
							player1();
							return;
						}
						let { elX, elY } = can_move(player, "data-player-2");
						if (elX && elY) {
							if (activeXY === `${elX}/${elY}`) {
								player.style.gridArea = xy;
								setTimeout(() => {
									player.remove();
									remove_event_listeners(".active");
									remove_event_listeners(".player-2");
									player1();
									return;
								}, 250);
							} else {
								remove_event_listeners(".active");
								remove_event_listeners(".player-2");
								player2();
								return;
							}
						} else {
							remove_event_listeners(".active");
							remove_event_listeners(".player-2");
							player2();
							return;
						}
					};
				});
				return;
			} else if (!enemy && !xy && can_move(player, "data-player-2")) {
				actives = document.querySelectorAll(".active");
				actives.forEach((active) => {
					active.onclick = (e) => {
						activeXY = e.target.getAttribute("data-board");
						if (
							parseInt(activeXY[0]) ===
								parseInt(playerXY[0]) - 1 &&
							(parseInt(activeXY[2]) ===
								parseInt(playerXY[2]) + 1 ||
								parseInt(activeXY[2]) ===
									parseInt(playerXY[2]) - 1)
						) {
							let {
								el,
								el_xy,
							} = check_if_there_is_an_element_to_eat(
								"data-player-2"
							);
							if (el && el_xy) {
								el.style.gridArea = el_xy;
								setTimeout(() => {
									removeEl(el);
								}, 250);
							}
							move(player, activeXY, "data-player-2");
							remove_event_listeners(".active");
							remove_event_listeners(".player-2");
							player1();
							return;
						} else {
							remove_event_listeners(".active");
							remove_event_listeners(".player-2");
							player2();
							return;
						}
					};
				});
				return;
			}
		};
	});
};
// start playing with player 1
player1();

/***
 * testing
 */

// test for can_move function
// test_can_move();

// test for can_eat function
//test_can_eat();

// test for can_eat_multiple function
// test_can_eat_multiple();

// test for check_if_tere_is_an_elemnt_to_eat function
// test_check_if_there_is_an_element_to_eat();
