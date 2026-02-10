# 👾 Alien Clicker Game (JavaScript Practice)

## 🎯 Goal

Your mission is to **defend the screen from invading aliens**.
Aliens appear randomly, and you must click them **before they disappear**.

If you miss too many… game over 💥

---

## 🕹️ Game Rules

- Aliens appear **one by one** at random positions on the screen
- Each alien:
  - Stays visible for a **limited time** (e.g. 2–3 seconds)
  - Gives **+1 score** when clicked

- If an alien disappears without being clicked:
  - Player **loses 1 life**

- The game ends when:
  - Lives reach **0**

---

## 📊 Game State

Track these values in JavaScript:

- `score` → how many aliens the player clicked
- `lives` → how many chances the player has left
- `playing` → whether the game is running or over

---

## 🧠 Concepts You Will Practice

This project helps you practice:

- DOM selection (`querySelector`, `getElementById`)
- Updating UI with `.textContent`
- Event handling (`click`)
- Timers (`setTimeout`, `setInterval`)
- Game state management (score, lives, game over)
- Creating and removing DOM elements dynamically

---

## 🧩 Core Features to Implement

- Spawn aliens at random positions
- Remove aliens after a delay
- Detect clicks on aliens
- Update score and lives
- End the game and show **Game Over**
- Reset the game with a **New Game** button

---

## 🎨 Optional Enhancements (After It Works)

- Different alien types (fast / slow)
- Sound effects
- Increasing difficulty over time
- Countdown timer
- Best score tracking

---

## 🚀 How to Win

There is no final “win” —
Try to **survive as long as possible** and beat your own high score 🏆

---

## 📁 Suggested File Structure

```
alien-clicker/
│
├── index.html
├── style.css
└── script.js
```
