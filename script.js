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
// Move Alien Randomly Inside Game Container
// --------------------
function moveAlien() {
  if (!wasHit) {
    lives--;
    livesEl.textContent = lives;
  }

  if (lives <= 0) {
    alien.classList.add('hidden');
    msg.textContent = 'You lost the game. Start over!';
    clearTimeout(alienInterval);
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
}

// --------------------
// Alien Click Handler
// --------------------
function hitAlien() {
  wasHit = true;
  score++;
  scoreEl.textContent = score;
  alien.classList.add('hidden');
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
