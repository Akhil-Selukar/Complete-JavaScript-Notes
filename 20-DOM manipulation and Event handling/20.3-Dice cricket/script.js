'use strict';

// Element selection
const scoreElement_0 = document.querySelector('#score--0');
const scoreElement_1 = document.getElementById('score--1');
const currScoreElement_0 = document.getElementById('current--0');
const currScoreElement_1 = document.getElementById('current--1');
const playerElement_0 = document.querySelector('.player--0');
const playerElement_1 = document.querySelector('.player--1');

const diceElement = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

let totalScore;
let currentScore;
let activePlayer;
let gameOn;

const init = function () {
  totalScore = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  gameOn = true;

  scoreElement_0.textContent = 0;
  scoreElement_1.textContent = 0;
  currScoreElement_0.textContent = 0;
  currScoreElement_1.textContent = 0;
  diceElement.classList.add('hidden');
  playerElement_0.classList.add('player--active');
  playerElement_1.classList.remove('player--active');
  playerElement_0.classList.remove('player--winner');
  playerElement_1.classList.remove('player--winner');
};

const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  if (activePlayer === 0) {
    playerElement_1.classList.toggle('player--active');
    playerElement_0.classList.toggle('player--active');
  } else {
    playerElement_1.classList.toggle('player--active');
    playerElement_0.classList.toggle('player--active');
  }
};

// Initial conditions
init();

btnRoll.addEventListener('click', function () {
  if (gameOn) {
    // Generate randome number between 1 to 6
    const diceNumber = Math.trunc(Math.random() * 6) + 1;

    // Show dice for generate number
    diceElement.classList.remove('hidden');
    diceElement.src = `images\\dice-${diceNumber}.png`;

    // Check for roll 1 ? Next player : add to score
    if (diceNumber !== 1) {
      currentScore += diceNumber;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      switchPlayer();
    }
  }
});

btnHold.addEventListener('click', function () {
  if (gameOn) {
    // Add current score to total score
    totalScore[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      totalScore[activePlayer];

    // Check win condition
    if (totalScore[activePlayer] >= 100) {
      gameOn = false;
      diceElement.classList.add('hidden');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
    } else {
      switchPlayer();
    }
  }
});

// Reset game
btnNew.addEventListener('click', init);
