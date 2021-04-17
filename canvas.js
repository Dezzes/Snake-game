let cnv = document.getElementById('canvas');
let ctx = cnv.getContext('2d');
//  Load Images
let groundImg = new Image();
groundImg.src="img/ground.png"
let foodImg = new Image();
foodImg.src="img/food.png"
//let audioName = new Audio();
//audioName.src = "path/audio.mp3"
//  Logic
let box=32; // the length of one box on the canvas
let snake=[];
let score=0;
snake[0]={x: 9*box, y:10*box};
snake[1]={x: 8*box, y:10*box};
let food={
  x: Math.floor(Math.random()*16+1)*box,
  y: Math.floor(Math.random()*15+3)*box
};

document.addEventListener("keydown", direction);
let d = "RIGHT";
function direction(event) {
  if(event.keyCode==37 && d != "RIGHT") d="LEFT"
  else if(event.keyCode==38 && d != "DOWN") d="UP"
  else if(event.keyCode==39 && d != "LEFT") d="RIGHT"
  else if(event.keyCode==40 && d != "UP") d="DOWN"
}
//check collision function
function collision(head, array) {
  for(let i=0; i<array.length; i++){
    if(head.x == array[i].x && head.y == array[i].y){
      return true;
    }
  }
  return false;
}

function draw() {
  ctx.drawImage(groundImg,0,0);
  for (let i = 0; i < snake.length; i++) {
      ctx.fillStyle = (i==0) ? "green":"white";
      ctx.fillRect(snake[i].x, snake[i].y, box, box);
      ctx.strokeStyle = "red";
      ctx.strokeRect(snake[i].x, snake[i].y, box, box);
  }
  ctx.drawImage(foodImg, food.x, food.y);
  ctx.fillStyle = "White";
  ctx.font = "45px Changa One";
  ctx.fillText(score, 2*box, 1.6*box);

  let snakeX = snake[0].x;
  let snakeY = snake[0].y;

  //if the snake eats the food
  if(snakeX==food.x && snakeY==food.y){
    score++;
    food={
      x: Math.floor(Math.random()*16+1)*box,
      y: Math.floor(Math.random()*15+3)*box
    };
  }
  else snake.pop(); // remove the tail

  if (d=="LEFT") snakeX-=box;
  if (d=="UP") snakeY-=box;
  if (d=="RIGHT") snakeX+=box;
  if (d=="DOWN") snakeY+=box;

  //add a new Head
  let newHead = {
    x:snakeX,
    y:snakeY
  };

  //Game over
  if(snakeX<box || snakeX>17*box || snakeY<3*box || snakeY>17*box
    ||collision(newHead, snake))
    clearInterval(game)

    //increase the snake length
    snake.unshift(newHead);
}
let game = setInterval(draw, 100);
