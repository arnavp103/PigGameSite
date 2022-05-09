"use strict";
const players = document.querySelectorAll(".player");
const score0El = document.querySelector("#score--0");
const score1El = document.querySelector("#score--1");
const current0El = document.getElementById("current--0");
const current1El = document.getElementById("current--1");
const diceEl = document.querySelector(".dice");
const btnNew = document.querySelector(".btn--new");
const btnRoll = document.querySelector(".btn--roll");
const btnHold = document.querySelector(".btn--hold");

let score0 = 0;
let score1 = 0;
let currentScore = 0;

let player = true;
let playing = true;

score0El.textContent = score0;
score1El.textContent = score1;
diceEl.classList.add("hidden");

function addCurrent() {
	player
		? (current0El.textContent = currentScore)
		: (current1El.textContent = currentScore);
}

function changeActive() {
	players[0].classList.toggle("player--active");
	players[1].classList.toggle("player--active");
	player = !player;
}

function checkVictory(num) {
	if (score0 >= 10 || score1 >= 10) {
	players[num].classList.add("player--winner");
	players[num].classList.remove("player--active");
	diceEl.classList.add("hidden");
	playing = false;
	}
}

btnRoll.addEventListener("click", () => {
	if (playing) {
		const dice = Math.trunc(Math.random() * 6) + 1;

		diceEl.classList.remove("hidden");
		diceEl.src = `dice-${dice}.png`;

		if (dice !== 1) {
			currentScore += dice;
			addCurrent();
		} else {
			currentScore = 0;
			addCurrent();
			changeActive();
		}
	}
});

btnHold.addEventListener("click", () => {
	if (player && playing) {
		score0 += currentScore;
		score0El.textContent = score0;
		currentScore = 0;
		addCurrent();
		checkVictory(0);
		changeActive();
	} else if (playing) {
		score1 += currentScore;
		score1El.textContent = score1;
		currentScore = 0;
		addCurrent();
		checkVictory(1);
		changeActive();
	}
});

btnNew.addEventListener("click", () => {
	playing = true;
	score0 = 0;
	score0El.textContent = score0;
	addCurrent();
	score1 = 0;
	player = true;
	score1El.textContent = score1;
	addCurrent();
	currentScore = 0;
	players[0].classList.remove("player--winner");
	players[0].classList.add("player--active");
	players[1].classList.remove("player--winner");
	players[1].classList.remove("player--active");
});
