'use strict';

const alien = document.querySelector('.alien');
const scoreEl = document.querySelector('#score');
const livesEl = document.querySelector('#lives');
const msg = document.querySelector('#msg');
const btnNewGame = document.querySelector('.new-game');

const game = document.querySelector('.game');

// const gameW = document.querySelector('.game').clientWidth;
// const gameH = document.querySelector('.game').clientHeight;

const gameW = game.clientWidth;
const gameH = game.clientHeight;

const alienW = alien.clientWidth;
const alienH = alien.clientHeight;

// const maxTop = gameH - alienH;
// const maxLeft = gameW - alienW;

let score, lives, alienInterval, wasHit;

// --------------------
//  Update bounds dynamically
// --------------------
function updateBounds() {
  const gameW = game.clientWidth;
  const gameH = game.clientHeight;
  const alienW = alien.clientWidth;
  const alienH = alien.clientHeight;

  return {
    maxTop: gameH - alienH,
    maxLeft: gameW - alienW,
  };
}

// Listen to window resize
window.addEventListener('resize', updateBounds);

// --------------------
//  Alien hit handler
// --------------------

function hitAlien() {
  wasHit = true;
  score++;
  scoreEl.textContent = score;
  alien.classList.add('hidden');
}

// --------------------
//   Game initialization
// --------------------

const init = function () {
  // Reset score
  score = 0;
  lives = 3;
  scoreEl.textContent = score;
  livesEl.textContent = lives;
  msg.textContent = '';

  // Make alien visible
  alien.classList.remove('hidden');

  // Stop previous game loop
  if (alienInterval) clearInterval(alienInterval);

  // Adjust speed for mobile/desktop
  const intervalTime = window.innerWidth < 600 ? 2500 : 2000;

  // Start moving alien every 2 seconds
  alienInterval = setInterval(() => {
    //   Evaluate previous round
    if (!wasHit) {
      lives--;
      livesEl.textContent = lives;
    }

    //   Game over check
    if (lives === 0) {
      clearInterval(alienInterval);
      alien.classList.add('hidden');
      msg.textContent = 'You lost the game. Start over!';
      return;
    }

    //   Start next round
    wasHit = false;

    const { maxTop, maxLeft } = updateBounds();
    const randomTop = Math.trunc(Math.random() * maxTop);
    const randomLeft = Math.trunc(Math.random() * maxLeft);

    alien.style.top = randomTop + 'px';
    alien.style.left = randomLeft + 'px';
    alien.classList.remove('hidden');
  }, intervalTime);
};

// --------------------
//   Event listeners
// --------------------
alien.addEventListener('pointerdown', hitAlien);
btnNewGame.addEventListener('click', init);

// --------------------
//  Start the game
// --------------------
init();
