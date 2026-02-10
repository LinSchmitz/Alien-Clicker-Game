'use strict';

// --------------------
// DOM Elements
// --------------------
const alien = document.querySelector('.alien');
const scoreEl = document.querySelector('#score');
const livesEl = document.querySelector('#lives');
const msg = document.querySelector('#msg');
const btnNewGame = document.querySelector('.btn.new-game');
const game = document.querySelector('.game');

// --------------------
// Game State
// --------------------
let score = 0;
let lives = 3;
let alienInterval;
let wasHit = true;

// --------------------
// Helper: Get Alien & Game Sizes
// --------------------
function getSizes() {
  const alienW = alien.offsetWidth;
  const alienH = alien.offsetHeight;

  const inner = document.querySelector('.inner-window');
  const innerRect = inner.getBoundingClientRect();
  const gameRect = game.getBoundingClientRect();

  // Inner window width/height relative to container
  const gameW = inner.offsetWidth;
  const gameH = inner.offsetHeight;

  // Inner window top-left relative to game
  const offsetX = inner.offsetLeft;
  const offsetY = inner.offsetTop;

  return { alienW, alienH, gameW, gameH, offsetX, offsetY };
}

// --------------------
// createStars
// --------------------
function createStars(numStars = 10) {
  // Remove old stars
  document.querySelectorAll('.star').forEach(star => star.remove());

  const { gameW, gameH, offsetX, offsetY } = getSizes();

  for (let i = 0; i < numStars; i++) {
    const star = document.createElement('div');
    star.classList.add('star');

    // Random position inside inner-window
    const left = offsetX + Math.random() * gameW;
    const top = offsetY + Math.random() * gameH;

    star.style.left = left + 'px';
    star.style.top = top + 'px';

    game.appendChild(star);
  }
}

// --------------------
// Move Alien Randomly Inside Game Container
// --------------------
function moveAlien() {
  if (!wasHit) {
    lives--;
    livesEl.textContent = lives;
  }

  // if (lives <= 0) {
  //   alien.classList.add('hidden');
  //   createStars(0);
  //   msg.textContent = 'You lost the game. Start over!';
  //   clearTimeout(alienInterval);
  //   return;
  // }
  if (lives <= 0) {
    createStars(0); // remove stars
    alien.classList.add('lost'); // trigger lost animation
    msg.textContent = 'You lost the game. Start over!';
    clearTimeout(alienInterval);

    // Remove alien from screen after animation ends
    alien.addEventListener(
      'animationend',
      () => {
        alien.classList.remove('lost');
        alien.classList.add('hidden');
      },
      { once: true },
    );

    return;
  }

  wasHit = false;

  // Get sizes
  const { alienW, alienH, gameW, gameH, offsetX, offsetY } = getSizes();

  const marginX = alienW;
  const marginY = alienH;

  const maxLeft = gameW - alienW - marginX;
  const maxTop = gameH - alienH - marginY;

  const randomLeft = offsetX + marginX + Math.random() * maxLeft;
  const randomTop = offsetY + marginY + Math.random() * maxTop;

  alien.style.left = `${randomLeft}px`;
  alien.style.top = `${randomTop}px`;

  alien.classList.remove('hidden');

  // Next move
  alienInterval = setTimeout(moveAlien, window.innerWidth < 600 ? 2500 : 2000);
  // Add random stars each round
  createStars(25); // 5 random stars
}

// --------------------
// Alien Click Handler
// --------------------
// function hitAlien() {
//   wasHit = true;
//   score++;
//   scoreEl.textContent = score;
//   alien.classList.add('hidden');
// }
function hitAlien() {
  wasHit = true;
  score++;
  scoreEl.textContent = score;

  // Play explosion sound
  const audio = new Audio('explosion.mp3'); // make sure file exists
  audio.volume = 0.2; // small volume
  audio.play();

  // Trigger explosion animation
  alien.classList.add('explode');

  // Remove alien from screen after animation ends
  alien.addEventListener(
    'animationend',
    () => {
      alien.classList.remove('explode');
      alien.classList.add('hidden');
    },
    { once: true },
  );
}

// --------------------
// Game Initialization
// --------------------
function init() {
  score = 0;
  lives = 3;
  wasHit = true;

  scoreEl.textContent = score;
  livesEl.textContent = lives;
  msg.textContent = '';

  alien.classList.remove('hidden');

  if (alienInterval) clearTimeout(alienInterval);

  moveAlien();
}

// --------------------
// Event Listeners
// --------------------
alien.addEventListener('pointerdown', hitAlien);
btnNewGame.addEventListener('click', init);

// --------------------
// Start Game
// --------------------
init();
