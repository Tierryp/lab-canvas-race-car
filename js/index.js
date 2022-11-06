const canvas = document.querySelector("#canvas");
const ctx = canvas.getContext("2d");
const roadImage = new Image();
roadImage.src = "../images/road.png";
const gameCar = new Image();
gameCar.src = "../images/car.png";
let scoreFetcher = document.querySelector("#game-board span");
let score = 0;

let canvas1 = document.querySelector("#game-board canvas");
window.onload = () => {
  document.getElementById("start-button").onclick = () => {
    startGame();
  };

  function startGame() {
    console.log("clicked");
    
    myIntervalID = setInterval(animationLoop, 16);
  }
};

class Car {
  constructor(x, y,width,height) {
    this.x = x;
    this.y = y;
    this.width = width
    this.height = height

    gameCar.addEventListener("load" , () => {
this.gameCar = gameCar

    })

  }
  moveLeft() {
    this.x -= 30
  }

  moveRight(){
    this.x += 30
  }
  

  draw(){
  ctx.drawImage(this.gameCar, this.x, this.y ,this.width, this.height)
  }
}

class Obstacle extends Car {
  constructor(x, y, width, height) {
    super(x, y, width, height);
  }
  draw() {
    ctx.fillStyle = 'black'
    ctx.fillRect(this.x, this.y,this.width,this.height);
  }
  moveDown() {
    this.y += 15;
  }
  collisionCheck(Obstacle) {
    if (
      this.x < Obstacle.x + Obstacle.width &&
      this.x + this.width > Obstacle.x &&
      this.y < Obstacle.y + Obstacle.height &&
      this.height + this.y > Obstacle.y
    ) {
      console.log("detected");
      // Collision detected!
      return true;
    } else {
      // No collision
      return false;
    }
  }
}
const gameCarAct = new Car(canvas.width / 2.3, canvas.height / 1.2,30,50);
const ObstacleTest = new Obstacle (0,15,40,canvas.height)
const ObstacleTest2 = new Obstacle(450, 15, 40, canvas.height);




window.addEventListener('keydown',function(event){

  switch(event.code){
  case 'ArrowLeft':
    gameCarAct.moveLeft();
    console.log("moving left")
    break;
    case 'ArrowRight':
    gameCarAct.moveRight();
    console.log("moving right")
    break;
  }


})

let ObstacleArray = []
let frameCount = 0 
function animationLoop(){
 frameCount++
 
 if (frameCount % 60 === 0) {
   const Obstacle1 = new Obstacle(20, 0, (Math.random() * canvas.width) - 150, 50);
   const Obstacle2 = new Obstacle(20, 0, (Math.random() * canvas.width) - 150, 50);
   ObstacleArray.push(Obstacle1);
   ObstacleArray.push(Obstacle2);
  score++;
  scoreFetcher.innerHTML = score;
  }

   for (let i = 0;  i  < ObstacleArray.length;  i++) {  
    
    ObstacleArray[i].moveDown()
     ctx.fillStyle = "black";
   ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(roadImage, 0, 0, canvas.width, canvas.height);
  gameCarAct.draw();
  ObstacleArray[i].draw();
    if (ObstacleTest.collisionCheck(gameCarAct)) {
      console.log("collided");
      gameCarAct.x += 30

    } else if (ObstacleTest2.collisionCheck(gameCarAct)){
    gameCarAct.x -= 30
    }
    if (ObstacleArray[i].collisionCheck(gameCarAct)) {
      clearInterval(myIntervalID);
    }


  }




}
