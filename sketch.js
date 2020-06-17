//Create enemy and Player2 sprite variable
var enem1, enem2, enem3, enem4, Player2, bullet, bottomEdge, gameState;

//Create variables for animations
var enem1Anim, enem2Anim, enem3Anim, enem4Anim, Player2Anim, bulletAnim, backAnim;

//Create Enemy and bullet Group
var enemyGroup, bulletGroup;

//Create variable for Background
var Background;

//game States
var PLAY = 1;
var END = 0;

function preload() {
  enem1Anim = loadImage("enemy1.png");
  enem2Anim = loadImage("enemy2.png");
  enem3Anim = loadImage("enemy3.png");
  enem4Anim = loadImage("enemy4.png");
  Player2Anim = loadImage("Player2.png");
  bulletAnim = loadImage("Bullet.png");
  backAnim = loadImage("Background.jpg");
}

function setup() {
  createCanvas(500, 500);

  Background = createSprite(250, 250, 500, 500);
  Background.addImage("ha", backAnim); 
  Background.depth = 3;
  Background.scale = 1.3;

  
  Player2 = createSprite(250, 425, 10, 10);
  Player2.addImage("sp1", Player2Anim);
  Player2.scale = 0.45;
  //Player2.rotation = -45;
  //Player2.debug=true;
  Player2.setCollider("rectangle", 0, 0, Player2.width - 50, Player2.height - 50, 45)
  
  enemyGroup = createGroup();
  bulletGroup = createGroup();
  
  bottomEdge = createSprite(250, 550, 500, 1);
  bottomEdge.visible = false;
  
  gameState = 1;
}

function draw() {
  //background("white");  

  
  if (gameState === PLAY) {
    //Checks if enemy has touched Player2
    planeTouch();
    
    //Shoot bullets
    spawnBullets();

    //Spawn Enemy
    spawnEnemy();
    enemyGroup.setLifetimeEach(298); 
    
    //Makes plane follow mouse cursor
    Player2.position.x = mouseX;

    //plane wont go beyong the left or right edge
    if (Player2.position.x >= 460) {
      Player2.position.x = 455;
    } else if (Player2.position.x <= 45) {
      Player2.position.x = 45;
    }

    
  }  
  
  if (gameState === END) {
    enemyGroup.setVelocityYEach(0);
    endState();
    
   
  }
  
  drawSprites();

  textSize(14);
  text("Press SPACE to shoot!", 320, 490);

  textSize(15);
  text("If the enemy touches you, reload the page!", 15, 490);
  
}


function planeTouch() {
  if (Player2.isTouching(enemyGroup) || enemyGroup.isTouching(bottomEdge)) {
    gameState = 0;
  }
}

function spawnBullets () {
  if (keyWentDown("space")) {
    bullet = createSprite(Player2.x, 430, 2, 15);
    bullet.addImage("bullet", bulletAnim);
    bullet.scale = 0.05;
    bullet.lifetime = 76;
    
    bulletGroup.add(bullet);
    bulletGroup.setVelocityYEach(-9);
  }
  
  if (bulletGroup.isTouching(enemyGroup)) {
      enemyGroup.destroyEach();
      bulletGroup.destroyEach();
  }
}

function spawnEnemy() {
  if ((frameCount % 75) === 0) {
    //Making Enemy Sprites
    var enemy = createSprite(Math.round(random(40, 460)), 0, 20, 20);
    enemy.setVelocity(0, 6);
    enemy.scale = 0.25;
    
    //enemy.debug = true;
    enemy.setCollider("rectangle", 0, -10, 160, 140)
    
    enemyGroup.add(enemy);
    
    var cases = Math.round(random(1,4));
    switch(cases) {
     case 1:enemy.addImage("tt",enem1Anim);
       break;
       
     case 2:enemy.addImage("cc",enem2Anim);
       break;
       
     case 3:enemy.addImage("dd",enem3Anim);
       break;
       
     case 4:enemy.addImage("ss",enem4Anim);
       break;
       
     default:break;
     
   }
 }
}

function endState() {
   for (var x = 0; x < 1; x++) {
      if (x === 1) {
        x = 0
      }
        bulletGroup.setLifetimeEach(100);
        enemyGroup.setLifetimeEach(100);
    }
}