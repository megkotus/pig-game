'use strict';

// Selecting elements
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.querySelector('#score--0');
const score1El = document.querySelector('#score--1');
const current0El = document.querySelector('#current--0');
const current1El = document.querySelector('#current--1');
const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

let scores, currentScore, activePlayer, playing;

const init = function () {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;

  diceEl.classList.add('hidden');

  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
};

init();

const switchPlayer = function () {
  //switch player
  currentScore = 0;
  document.getElementById(`current--${activePlayer}`).textContent =
    currentScore;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

btnRoll.addEventListener('click', function () {
  if (playing) {
    const dice = Math.trunc(Math.random() * 6) + 1;

    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;

    //Check for rolled 1
    if (dice !== 1) {
      //add dice roll to the score
      currentScore += dice;
      //display new score
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      //reset score and switch player
      switchPlayer();
    }
  }
});

// Hold score
btnHold.addEventListener('click', function () {
  if (playing) {
    //save score
    scores[activePlayer === 0 ? 0 : 1] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer === 0 ? 0 : 1];
    //winner
    if (scores[activePlayer] >= 30) {
      //Finish the game
      diceEl.classList.add('hidden');
      playing = false;
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document.getElementById(`name--${activePlayer}`).textContent = 'Winner!';
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    } else {
      //reset score and switch player
      switchPlayer();
    }
  }
});

// reset game
btnNew.addEventListener('click', function () {
  init();
  document.getElementById(`name--0`).textContent = 'Player 1';
  document.getElementById(`name--1`).textContent = 'Player 2';
});
