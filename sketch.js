var engine, world;
var aliens, aliensImage;
var backgroundImage;
var soldier, aliensGroup;
var ammos = [];
var alienss = [];
var ghosts = [];
var hearts = [];
var touches = [];
var bulletImage;
var soldierImage;
var ghost, ghostImage;
var gameState = 0;
var border, score = 0;
var lives = 3;
var heart, heartImage, heartGroup;
var boomAnimation;
var gunFire;

function preload(){

  backgroundImage = loadImage("./images/Background.jpg");
  aliensImage = loadImage("./images/Alien.png");
  bulletImage = loadImage("./images/Bullet.png");
  soldierImage = loadImage("./images/Soldier.png");
  ghostImage = loadImage("./images/Ghost.png");
  heartImage = loadImage("./images/Heart.png");
  boomAnimation = loadAnimation("./images/Boom 1.JPG", "./images/Boom 2.JPG", "./images/Boom 3.JPG", "./images/Boom 4.JPG", "./images/Boom 5.JPG", "./images/Boom 6.JPG", "./images/Boom 7.JPG", "./images/Boom 8.JPG", "./images/Boom 9.JPG", "./images/Boom 10.JPG", "./images/Boom 11.JPG", "./images/Boom 12.JPG");
  gunFire = loadSound("./assets/Gun Fire.mp3")

}

function setup(){

  createCanvas(windowWidth, windowHeight);

  soldier = createSprite(width/2, 600, 20, 20);
  soldier.addImage(soldierImage);
  soldier.scale = 0.1;

  border = createSprite(width/2, 650, 1500, 20);
  border.visible = false;
  
  aliensGroup = new Group();
  heartGroup = new Group();

  imageMode(CENTER);

}

function draw(){
  
  background(20);
  image(backgroundImage, width/2, height/2, width, height);
  
  fill("white");
  textSize(30);
  text("Score : " + score, 50, 50);

  fill("white");
  textSize(30);
  text("Lives : " + lives, 1190, 50);

  fill("white");
  textSize(30);
  text("| Tap to Shot |", 400, 50);

  fill("white");
  textSize(30);
  text("| Score 50 To Win |", 700, 50);

  if (gameState === 0){
    soldier.x = mouseX;
  
  spawnAliens();
  spawnGhost();
  spawnHeart();

  if (touches.length>0){
    var ammo = createSprite(soldier.x, soldier.y-10, 10, 10);
    ammo.velocityY = -40;
    ammo.addImage(bulletImage);
    ammo.scale = 0.02;
    gunFire.play();
    ammos.push(ammo);
    touches = [];
  }

  for (var i = 0 ; i<ammos.length ; i++){
    for(var j = 0 ; j<alienss.length ; j++){
      if (ammos[i].isTouching(alienss[j])){
        score = score + 1;
        alienss[j].changeAnimation("boom");
        setTimeout(()=>{
             ammos[i].destroy();
             alienss[j].destroy();
             ammos.splice(i, 1);
             alienss.splice(j, 1);
        },500)
        
      }
    }
  }

  for (var i = 0 ; i<ammos.length ; i++){
    for(var j = 0 ; j<ghosts.length ; j++){
      if (ammos[i].isTouching(ghosts[j])){
        score = score + 3;
        ghosts[j].changeAnimation("Boom 1");
        setTimeout(()=>{
               ammos[i].destroy();
               ghosts[j].destroy();
               ammos.splice(i, 1);
               ghosts.splice(j, 1);
        },500);
        
      }
    }
  }

  for (var i = 0 ; i<ammos.length ; i++){
    for (var k = 0 ; k<hearts.length ; k++){
      if (ammos[i].isTouching(hearts[k])){
        lives = lives + 1;
        ammos[i].destroy();
        hearts[k].destroy();
        ammos.splice(i, 1);
        hearts.splice(k, 1);
      }
    }
  }

  for (var k = 0 ; k<alienss.length ; k++){
      if (alienss[k].isTouching(border)){
        lives = lives - 1;
        alienss[k].destroy();
        alienss.splice(k, 1);
        if (lives === 0){
          gameState = 1;
          console.log("game over");
      }
      }
    }
  }

  for (var k = 0 ; k<ghosts.length ; k++){
      if (ghosts[k].isTouching(border)){
        lives = lives - 1;
        ghosts[k].destroy();
        ghosts.splice(k, 1);
        if (lives === 0){
          gameState = 1;
          console.log("game over");
      }
      }
    }

    for (var i = 0 ; i<hearts.length ; i++){
      if (hearts[i].isTouching(border)){
        hearts[i].destroy();
        hearts.splice(i, 1);
        if (lives === 0){
          gameState = 1;
          console.log("game over");
        }
      }
    }

    if (score === 10){
      gameState = 2;
      gameWin();
    }

  if (gameState === 1){
    aliensGroup.destroyEach();
    heartGroup.destroyEach();
    gameOver();
  }

  if (gameState === 2){
    aliensGroup.destroyEach();
    heartGroup.destroyEach();
    gameWin();
  }

  drawSprites();
  
}

function spawnHeart(){

  if (frameCount % 150 === 0){
    var heart = createSprite(random(20, width/2), 0, 50, 50);
    heart.addImage(heartImage);
    heart.velocityY = 4;
    heart.scale = 0.1;
    hearts.push(heart);
    heartGroup.add(heart);
  }
}

function spawnAliens(){

  if (frameCount % 50 === 0){
    var aliens = createSprite(random(20, width-20), 0, 50, 50);
    aliens.addImage(aliensImage);
    aliens.velocityY = 5;
    aliens.scale = 0.6;
    aliens.addAnimation("boom", boomAnimation);
    alienss.push(aliens);
    aliensGroup.add(aliens);
  }

}

function spawnGhost(){

  if (frameCount % 100 === 0){
    var ghost = createSprite(random(20, width-20), 0, 50, 50);
    ghost.addImage(ghostImage);
    ghost.velocityY = 10;
    ghost.scale = 0.4;
    ghost.addAnimation("Boom 1", boomAnimation);
    ghosts.push(ghost);
    aliensGroup.add(ghost);
  }

}

function mouseClicked(){

  var ammo = createSprite(soldier.x, soldier.y-10, 10, 10);
  ammo.velocityY = -40;
  ammo.addImage(bulletImage);
  ammo.scale = 0.02;
  gunFire.play();
  ammos.push(ammo);

}

function gameOver(){

  swal({
    text :"Game Over", title : "Well Played ! ",
    confirmButtonText : " Restart " 
  },
function (isConfirmed){
  if (isConfirmed){
    location.reload();
  }
}
  )
    
  }

function gameWin(){

  swal({
    text :"Hurrey ! , You won the game", title : "You Won",
    confirmButtonText : " Play Again "
  },
  function (isConfirmed){
    if (isConfirmed){
      location.reload();
    }
  }
  )
}