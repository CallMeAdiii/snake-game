// Get the canvas and score elements
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const scoreElement = document.getElementById('score');

// Game variables
const gridSize = 20; // Size of one square
let score = 0;
let dx = gridSize; // X direction speed
let dy = 0; // Y direction speed

// The snake is an array of objects representing coordinates
let snake = [
  { x: 200, y: 200 },
  { x: 180, y: 200 },
  { x: 160, y: 200 },
];

// The food object
let food = { x: 0, y: 0 };

// Function to place food at a random spot on the grid
function spawnFood() {
  food.x = Math.floor(Math.random() * (canvas.width / gridSize)) * gridSize;
  food.y = Math.floor(Math.random() * (canvas.height / gridSize)) * gridSize;
}

// Function to draw one block of the snake
function drawSnakePart(snakePart) {
  ctx.fillStyle = '#4caf50'; // Green color
  ctx.strokeStyle = '#2e7d32'; // Darker green outline
  ctx.fillRect(snakePart.x, snakePart.y, gridSize, gridSize);
  ctx.strokeRect(snakePart.x, snakePart.y, gridSize, gridSize);
}

// Function to draw the food
function drawFood() {
  ctx.fillStyle = '#f44336'; // Red color
  ctx.fillRect(food.x, food.y, gridSize, gridSize);
}

// Function to draw everything on the canvas
function draw() {
  // Clear the canvas first
  ctx.fillStyle = 'white';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  drawFood();

  // Draw each part of the snake
  for (let i = 0; i < snake.length; i++) {
    drawSnakePart(snake[i]);
  }
}

// Function to update the game logic
function update() {
  // Calculate where the new head should go based on direction
  const head = { x: snake[0].x + dx, y: snake[0].y + dy };

  // Add the new head to the beginning of the array
  snake.unshift(head);

  // Check if the snake ate the food
  if (head.x === food.x && head.y === food.y) {
    score++;
    scoreElement.innerHTML = score;
    spawnFood(); // Spawn new food
  } else {
    // If it didn't eat, remove the tail piece so it looks like it's moving
    snake.pop();
  }

  // Check collision with walls
  if (
    head.x < 0 ||
    head.x >= canvas.width ||
    head.y < 0 ||
    head.y >= canvas.height
  ) {
    gameOver();
  }

  // Check collision with its own body
  for (let i = 1; i < snake.length; i++) {
    if (head.x === snake[i].x && head.y === snake[i].y) {
      gameOver();
    }
  }
}

// Reset the game when you lose
function gameOver() {
  alert('Game Over! Your score was: ' + score);

  // Reset variables
  snake = [
    { x: 200, y: 200 },
    { x: 180, y: 200 },
    { x: 160, y: 200 },
  ];
  dx = gridSize;
  dy = 0;
  score = 0;
  scoreElement.innerHTML = score;
  spawnFood();
}

// Function to handle keyboard inputs
function changeDirection(event) {
  const LEFT_KEY = 37;
  const RIGHT_KEY = 39;
  const UP_KEY = 38;
  const DOWN_KEY = 40;

  const keyPressed = event.keyCode;

  // Check current direction so the snake can't reverse into itself
  const goingUp = dy === -gridSize;
  const goingDown = dy === gridSize;
  const goingRight = dx === gridSize;
  const goingLeft = dx === -gridSize;

  if (keyPressed === LEFT_KEY && !goingRight) {
    dx = -gridSize;
    dy = 0;
  }
  if (keyPressed === UP_KEY && !goingDown) {
    dx = 0;
    dy = -gridSize;
  }
  if (keyPressed === RIGHT_KEY && !goingLeft) {
    dx = gridSize;
    dy = 0;
  }
  if (keyPressed === DOWN_KEY && !goingUp) {
    dx = 0;
    dy = gridSize;
  }
}

// Start the game setup
spawnFood();
document.addEventListener('keydown', changeDirection);

// The game loop: runs the update and draw functions every 100 milliseconds
setInterval(function () {
  update();
  draw();
}, 100);
