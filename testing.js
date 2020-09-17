// test for can_eat function
function test_can_eat() {
	let el3 = document.querySelectorAll(".player-1");
	let el = document.querySelector(".row6col2");
	let el2 = document.querySelector(".row3col3");
	el2.setAttribute("data-player-1", "5/3");
	el2.style.gridArea = "5/3";
	el.addEventListener("click", () => {
		console.log(
			can_eat(el.getAttribute("data-player-2"), el3, "data-player-1")
		);
	});
}

// test for can_move function
function test_can_move() {
	let el2 = document.querySelector(".row3col3");
	el2.setAttribute("data-player-1", "5/1");
	el2.style.gridArea = "5/1";
	let el = document.querySelector(".row6col2");
	el.addEventListener("click", () => {
		console.log(can_move(el, "data-player-2"));
	});
}

// test for can_eat_multiple function
function test_can_eat_multiple() {
	let el = document.querySelector(".row6col2");
	let el2 = document.querySelector(".row3col3");
	el2.setAttribute("data-player-1", "5/3");
	el2.style.gridArea = "5/3";
	el.addEventListener("click", () => {
		console.log(can_eat_multiple(el, "data-player-2"));
	});
}

// test for check_if_tere_is_an_elemnt_to_eat function
function test_check_if_there_is_an_element_to_eat() {
	let el = document.querySelector(".row6col2");
	let el2 = document.querySelector(".row3col3");
	el2.setAttribute("data-player-1", "5/3");
	el2.style.gridArea = "5/3";
	el.addEventListener("click", () => {
		console.log(check_if_there_is_an_element_to_eat("data-player-2"));
	});
}
