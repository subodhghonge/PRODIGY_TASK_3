const gameBoard = document.getElementById('gameBoard');
const message = document.getElementById('message');
const playerVsPlayerBtn = document.getElementById('playerVsPlayer');
const resetBtn = document.getElementById('reset');

let currentPlayer = 'X';
let gameActive = true;
let gameState = ['', '', '', '', '', '', '', '', ''];

const winningConditions = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8],
  [0, 3, 6], [1, 4, 7], [2, 5, 8],
  [0, 4, 8], [2, 4, 6]
];

function handleCellClick(cell, index) {
  if (gameState[index] !== '' || !gameActive) return;

  cell.textContent = currentPlayer;
  gameState[index] = currentPlayer;
  checkWin();
  checkDraw();
  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
}

function checkWin() {
  for (const condition of winningConditions) {
    const [a, b, c] = condition;
    if (gameState[a] !== '' && gameState[a] === gameState[b] && gameState[a] === gameState[c]) {
      gameActive = false;
      message.textContent = `Player ${gameState[a]} wins!`;
    }
  }
}

function checkDraw() {
  if (!gameState.includes('')) {
    gameActive = false;
    message.textContent = 'It\'s a draw!';
  }
}

function resetGame() {
  gameState = ['', '', '', '', '', '', '', '', ''];
  gameActive = true;
  currentPlayer = 'X';
  message.textContent = '';
  document.querySelectorAll('.cell').forEach(cell => cell.textContent = '');
}

function setupEventListeners() {
  gameBoard.addEventListener('click', event => {
    const clickedCell = event.target;
    const cellIndex = parseInt(clickedCell.id);
    if (isNaN(cellIndex)) return;
    handleCellClick(clickedCell, cellIndex);
  });

  playerVsPlayerBtn.addEventListener('click', () => {
    resetGame();
  });

  resetBtn.addEventListener('click', resetGame);
}

setupEventListeners();
