var PLAY = 1;
var END = 0;
var gameState = PLAY;

var bananaImage;
var PLAY = 1;
var obstacleImage;
var obstaclegroup;
var back;
var score;
var  monkey_running;
var monkeystop;

function preload(){
  
  
  monkey_running = loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("stone.png");
 
  
  
  back = loadImage("jungle.jpg")
}


function setup() {
  createCanvas(windowWidth,windowHeight);
  
   background = createSprite(width/2,height/2,width ,height);
  background.addImage(back); 
  
  monkey = createSprite(80,height-150,20,50);
  monkey.addAnimation("running", monkey_running);
  monkey.scale = 0.2;
  
  ground = createSprite(200,height-120,900,20);
  ground.velocityX= -4;
  ground.x = ground.width /2;
    ground.log=(ground.x);
  ground.visible = false;
  
  //invisibleGround = createSprite(200,280 ,400,10);
 // invisibleGround.visible = false;
  
  //create Obstacle and Cloud Groups
  obstaclesGroup = createGroup();
  foodGroup = createGroup();
  
  
  monkey.setCollider("rectangle",0,0,250,250);
 //monkey.debug =true;
  
  score = 0;
  

}

function draw() {
  
 
  
  
  //displaying score

  
  
  if(gameState === PLAY){
    
    //move the ground
   background.velocityX = -(5+score/200);
    if (background.x < 250){
      background.x = background.width/2;
    }
    //scoring
    
    if (ground.x < 0){
      ground.x = ground.width/2;
    }
    
    //jump when the space key is pressed
    if((keyDown("space")||touches.lenth>0) && monkey.y >= height-199) {
        monkey.velocityY = -15
      touches = [];
    }
    
    //add gravity
    monkey.velocityY =monkey.velocityY + 0.7
  
 monkey.collide(ground)
    
    if (foodGroup.isTouching(monkey)){
      foodGroup.destroyEach();
      score = score + 2;
    }
    if(obstaclesGroup.isTouching(monkey)){
        gameState = END;
     monkey.scale=0.2;
     
    }
    switch(score){
        case 10:monkey.scale = 0.2;
        break;
        case 20:monkey.scale = 0.3;
        break;
        case 30:monkey.scale = 0.4;
        break;
        case 40:monkey.scale = 0.5;
        break
        
        default : break;
        
    }
    spawnbanana();
  
  
    spawnObstacles();
  }
   else if (gameState === END) {
     
      ground.velocityX = 0;
      monkey.velocityY = 0
     monkey.visible=false
     
      
        text("click on the monkey to reset te game",550,height-550)
     
      //set lifetime of the game objects so that they are never destroyed
    obstaclesGroup.setLifetimeEach(-1);
    foodGroup.setLifetimeEach(-1);
     
     obstaclesGroup.setVelocityXEach(0);
     foodGroup.setVelocityXEach(0);
     background.velocityX=0; 
   }
  
 
  drawSprites();
  

stroke("white");
  textSize (20);
fill("white")
      text("Score: "+ score,500,50);
}

function spawnObstacles(){
 if (frameCount % 150 === 0){
   var obstacle = createSprite(700,height-150,10,40);
   obstacle.velocityX = -(9+score/100);
   
    //generate random obstacles
    var rand = Math.round(random(1,6));
    switch(rand) {
      case 1: obstacle.addImage(obstacleImage);
              break;
      case 2: obstacle.addImage(obstacleImage);
              break;
      case 3: obstacle.addImage(obstacleImage);
              break;
      case 4: obstacle.addImage(obstacleImage);
              break;
      case 5: obstacle.addImage(obstacleImage);
              break;
      case 6: obstacle.addImage(obstacleImage);
              break;
      default: break;
    }
   
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.3 ;
    obstacle.lifetime = 300;
   
   //add each obstacle to the group
    obstaclesGroup.add(obstacle);
 }
}

function spawnbanana() {
  //write code here to spawn the clouds
  if (frameCount % 250 === 0) {
     banana = createSprite(width,height-200,40,10);               
    banana.y = Math.round(random(height-200,height-220));
    banana.addImage(bananaImage);
   banana .scale = 0.1 ;
    banana.velocityX = -(3+score / 100);
    
     //assign lifetime to the variable
    banana.lifetime = 250;

    
    
    
   foodGroup.add(banana);
    }
}
 function reset(){
  gameState = PLAY;
 
  
  obstaclesGroup.destroyEach();
  foodGroup.destroyEach();
  
  monkey.changeAnimation("running",monkey_running);
  
  score = 0;
  
   
}