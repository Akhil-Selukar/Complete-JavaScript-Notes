'use strict';

let hiddenNumber = Math.trunc(Math.random() * 20) + 1;
let score = 20;
let highscore = 0;

// Game logic
document.querySelector('.check').addEventListener('click', function () {
  let guess = Number(document.querySelector('.guess').value);

  if (!guess) {
    console.log('No number is entered.');
    document.querySelector('.message').textContent =
      '⚠️ Please enter a number.';
  } else if (guess === hiddenNumber) {
    document.querySelector('.message').textContent = '🥳 Correct guess..!!';
    document.querySelector('.number').textContent = hiddenNumber;
    document.querySelector('body').style.backgroundColor = '#60b347';
    document.querySelector('.number').style.width = '30rem';

    if (score > highscore) {
      highscore = score;
      document.querySelector('.highscore').textContent = highscore;
    }
  } else {
    if (score > 1) {
      document.querySelector('.message').textContent =
        guess > hiddenNumber
          ? '⬆️ Guess is too high..!!'
          : '⬇️ Guess is too low..!!';
      document.querySelector('.score').textContent = --score;
    } else {
      document.querySelector('.message').textContent =
        '😟 You lost the game..!!';
      document.querySelector('.score').textContent = 0;
    }
  }
});

// Restart logic
document.querySelector('.again').addEventListener('click', function () {
  hiddenNumber = Math.trunc(Math.random() * 20) + 1;
  score = 20;
  document.querySelector('body').style.backgroundColor = '#222';
  document.querySelector('.number').style.width = '15rem';
  document.querySelector('.number').textContent = '?';
  document.querySelector('.guess').value = '';
  document.querySelector('.message').textContent = 'Start guessing...';
  document.querySelector('.score').textContent = score;
});
