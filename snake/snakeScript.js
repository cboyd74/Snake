var canvas, context, x, y, currDirection, currScore, currHigh,  score, snakeLength;

const startX = 100;
const startY = 100;
const boardWidth = 400;
const boardHeight = 400;
var snake;
var food;
var highScore=0;
var timer;

var init = function() {
  canvas = document.getElementById('snakeCanvas');
  canvas.width = boardWidth;
  canvas.height = boardHeight;
  context = canvas.getContext('2d');

  snake = new Array();
  snakeLength=1;
  for (var i = 0; i < snakeLength; i++) {
      var snakeSqaure = {x: startX-(i*10), y: startY};
      snake.push(snakeSqaure);
  }
  generateFood();
  currDirection = "starting";

  score = 0;
  currScore = document.getElementById("currScore");
  currScore.innerText = "Score: " + score;
  currHigh = document.getElementById("currHigh");
  currHigh.innerText = "High Score: " + highScore;
  drawBoard();
}

var game = function() {
  document.addEventListener("keydown", moveSnake, false);
  init();
}

var move = function(moveX, moveY) {
    //checking if out of bounds
    if (snake[0].x >= boardWidth || snake[0].x < 0) {
        outOfBounds();
        return;
    }
    if (snake[0].y < 0 || snake[0].y >= boardHeight) {
        outOfBounds();
        return;
    }

    var head = {x: snake[0].x + moveX, y: snake[0].y + moveY};
    snake.unshift(head);
    snake.pop();

    if (checkEatingTail()) {
        eatingTail();
        return
    }
    if (checkForEat()){
        eat();
    }
    drawBoard();

  timer = setTimeout(function(){move(moveX, moveY);}, 90);
}

var drawBoard = function() {
  context.clearRect(0,0,canvas.width,canvas.height);
  context.fillStyle = "#FF57F5";
  context.fillRect(food[0], food[1], 10, 10);

  for (var i = 0; i < snakeLength; i++) {
    context.fillStyle = "#4a4a4a";
   context.fillRect(snake[i].x, snake[i].y, 10, 10);
    	context.fillStyle = "#39ff14";
    	context.fillRect(snake[i].x+(0.5), snake[i].y+(0.5), 9,9);	
	
  }
}

var generateFood = function() {
    var randX=-1;
    var randY=-1;
    var done = false;
    while(!done) {
        randX = (Math.ceil(Math.random()*boardWidth) % boardWidth);
        randY = (Math.ceil(Math.random()*boardHeight) % boardHeight);
        if (randX%10 === 0 && randY%10 === 0) {
              done = true;
        }
      //  checking if food is on the snake
      if (snakeLength!==1) {
          if (randX===food[0] && randY===food[1]) {
              done = false;
          }
      }
        for (var i =1; i < snakeLength; i++) {
            if (snake[i].x === randX && snake[i].y === randY) {
              done = false;
            }
        }
    }
    food = [randX, randY];
}

var checkForEat = function() {
    if (snake[0].x === food[0] && snake[0].y === food[1]) {
        return true;
    }
    return false;
}

var eat = function() {
    var endOfSnake = [snake[snakeLength-1].x, snake[snakeLength-1].y];
    for (var i = 1; i < 7; i++) {
        console.log(i);
        snake.push([endOfSnake[0]-(i*10), endOfSnake[1]]);
    }
    snakeLength+=6;
    score = snakeLength*100;
    currScore.innerText = "Score: " + score;
    generateFood();
}

var checkEatingTail = function() {
    if (snakeLength === 1) {
      return false;
    }
    for (var i = 1; i < snakeLength; i++) {
      if (snake[0].x===snake[i].x && snake[0].y===snake[i].y) {
          return true;
      }
  }
}


var movingRight = function() {
  if (currDirection === "right") {
    return true;
  } else {
    return false;
  }
}

var movingLeft = function() {
  if (currDirection === "left") {
    return true;
  } else {
    return false;
  }
}

var movingUp = function() {
  if (currDirection === "up") {
    return true;
  } else {
    return false;
  }
}

var movingDown = function() {
  if (currDirection === "down") {
    return true;
  } else {
    return false;
  }
}

var outOfBounds = function() {
  alert("You went out of bounds! Game over.");
  gameOver();
  }

var eatingTail = function() {
  alert("You ate your tail! Game over.");
  gameOver();
}

var gameOver = function() {
  clearTimeout(timer);
  if (score > highScore) {
	highScore = score;
  }
  alert("Your score: " + score );
  currHigh.innerText = "High Score: " + highScore;
  score = 0;
  currScore.innerText = "Score: " + score;
  init();
}

function moveSnake(e) {
    var keyCode = e.keyCode;
    if (keyCode === 87 && !movingDown()) { //up
      clearTimeout(timer);
      currDirection = "up";
      move(0,-10);
    } else if (keyCode === 83 && !movingUp()) { //down
      clearTimeout(timer);
      currDirection = "down";
      move(0,10);
    } else if (keyCode === 65 && !movingRight()) { //left
      clearTimeout(timer);
      currDirection = "left";
      move(-10,0);
    } else if (keyCode === 68 && !movingLeft()) { //right
      clearTimeout(timer);
      currDirection = "right";
      move(10,0);
    } else if(keyCode === 32) {
      clearTimeout(timer);
    }
  }
