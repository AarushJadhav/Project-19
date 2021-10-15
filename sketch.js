var towerImg, tower;
var doorImg, door, doorsGroup;
var climberImg, climber, climbersGroup;
var ghost, ghostImg;
var invisibleBlockGroup, invisibleBlock;
var gameState = "play"
var score = 0;

function preload(){
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostImg = loadImage("ghost-standing.png");
  spookySound = loadSound("spooky.wav");
}

function setup() {
  createCanvas(600, 600);
  tower = createSprite(300,300);
  tower.addImage("tower", towerImg);

  doorsGroup = new Group();
  climbersGroup = new Group();
  invisibleBlockGroup = new Group();

  ghost = createSprite(200, 200, 50, 50);
  ghost.addImage(ghostImg);
  ghost.scale = 0.3;

  score = 0;
}

function draw() {

  if(gameState === "play"){
    background(200);
    text("Score : " + score, 500, 50);

    score = score + Math.round(getFrameRate()/60);
    tower.velocityY = (1 + 3*score/100);
    
    if(tower.y > 400){
      tower.y = 300;
    }
    
    if(keyDown("space")){
      ghost.velocityY = -12;
    }
  
    ghost.velocityY = ghost.velocityY + 0.8;
    
    if(keyDown("RIGHT_ARROW")){
      ghost.x = ghost.x + 3;
    }
  
    if(keyDown("LEFT_ARROW")){
      ghost.x = ghost.x - 3;
    }
    
    if(climbersGroup.isTouching(ghost)){
      ghost.velocityY = 0;
    }
    
    spawnDoors();
    drawSprites();

    if(invisibleBlockGroup.isTouching(ghost) || ghost.y > 600){
      ghost.destroy();
      gameState = "end";
    }
  }

  if(gameState === "end"){
    background("black");
    fill("red");
    textSize(30);
    text("Game Over!", 230, 250);
    addSound("spooky.wav");

    if(mousePressedOver("Enter")){
      reset();
    }
  }

}

function spawnDoors(){
  if(frameCount % 240 === 0){
    door = createSprite(200, -50);
    door.addImage(doorImg);

    climber = createSprite(200, 10);
    climber.addImage(climberImg);

    door.x = Math.round(random(120, 400));
    door.velocityY = 1;

    climber.x = door.x;
    climber.velocityY = 1;

    invisibleBlock = createSprite(200, 15);
    invisibleBlock.width = climber.width;
    invisibleBlock.height = 2;
    invisibleBlock.x = door.x;
    invisibleBlock.velocityY = 1;

    ghost.depth = door.depth;
    ghost.depth += 1;

    invisibleBlockGroup.add(invisibleBlock);

    door.liftime = 800;
    climber.lifetime = 800;

    doorsGroup.add(door);
    climbersGroup.add(climber);
  }
}

function reset(){
  gameState = PLAY
  door.destroyEach();
  climber.destroyEach();
}
