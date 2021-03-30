"use strict";

const score0 = document.querySelector("#score--0"),
  score1 = document.querySelector("#score--1"),
  player0 = document.querySelector(".player--0"),
  player1 = document.querySelector(".player--1"),
  imgDice = document.querySelector(".dice"),
  curScore0 = document.querySelector("#current--0"),
  curScore1 = document.querySelector("#current--1"),
  btnRoll = document.querySelector(".btn--roll"),
  btnHold = document.querySelector(".btn--hold"),
  btnReset = document.querySelector(".btn--reset");

let scores, curScore, activePlayer;

function init() {
  scores = [0, 0];
  curScore = 0;
  activePlayer = 0;

  curScore0.textContent = 0;
  curScore1.textContent = 0;
  score0.textContent = 0;
  score1.textContent = 0;

  btnRoll.classList.remove("hidden");
  btnHold.classList.remove("hidden");
  player0.classList.add("player--active");
  player1.classList.remove("player--active");
  player0.classList.remove("player--winner");
  player1.classList.remove("player--winner");

  hideDice();
}

function switchPlayer() {
  document.querySelector(`#current--${activePlayer}`).textContent = 0;
  curScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;

  player0.classList.toggle("player--active");
  player1.classList.toggle("player--active");
}

function printCurrentScore(num) {
  curScore += num;
  document.querySelector(`#current--${activePlayer}`).textContent = curScore;
}

function printDice(num) {
  imgDice.classList.remove("hidden");
  imgDice.src = `dice-${num}.png`;
}

function hideDice() {
  imgDice.classList.add("hidden");
}

function gameOver() {
  document.querySelector(`.player--active`).classList.add("player--winner");
  document.querySelector(`#current--${activePlayer}`).textContent = 0;

  btnRoll.classList.add("hidden");
  btnHold.classList.add("hidden");
  hideDice();
}

btnRoll.addEventListener("click", function () {
  const dice = Math.trunc(Math.random() * 6) + 1;
  printDice(dice);

  if (dice !== 1) printCurrentScore(dice);

  if (dice === 1) switchPlayer();
});

btnHold.addEventListener("click", function () {
  scores[activePlayer] += curScore;

  document.querySelector(`#score--${activePlayer}`).textContent =
    scores[`${activePlayer}`];

  if (scores[activePlayer] < 50) {
    switchPlayer();
    hideDice();
  } else {
    gameOver();
  }
});

btnReset.addEventListener("click", init);

init();
