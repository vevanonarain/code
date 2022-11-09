var main, main_run, main_shoot, main_jump;
var enemy, bullet;
var bg1, bg2, music
var life = 3, score;
var gameState = "PLAY"


function preload(){
  bg1= loadImage("assets/bg.png");
  enemy = loadImage("assets/enemy.png");

  main = loadImage("assets/main.png")
  main_run = loadImage("assets/main_run.png")
  main_shoot = loadImage("assets/main_shoot.png")
  main_jump = loadImage("assets/main_jump.png")

  bullet = loadImage("assets/bullet.png")

  music = loadSound("assets/music.mp3")
}

function setup() {
  createCanvas(1500, 750);
  
  bg2= createSprite(750,350,1500,700);
  bg2.addImage(bg1);
  bg2.y = bg2.height;
  bg2.velocityY= 4
  
  player= createSprite(750,640);
  player.addImage(main_run);
  player.scale= 0.5;
  
  bullets = createSprite(player.x ,player.y,5,40);
  bullets.addImage(bullet)
  bullet.visible= false;
  
  enemyGroup= new Group ();

  music.play()
}

function draw() {
  if (gameState==="PLAY"){
           player.x = mouseX;

      if (bg2.y > 700){
          bg2.y = 350
      }
      if (keyDown("Space")){
          bullets.x=player.x
          bullets.y=player.y
          bullets.visible= true;
          bullets.velocityY= -6;
          }
      if (keyDown("Shift") && player.y >= 250){
        player.velocityY = -10
      }
      spawnEnemies();
      if (bullet.isTouching(enemyGroup)){
          enemyGroup.destroyEach();
          score=score+5;
          }
    
      if (enemyGroup.isTouching(player)){
          enemyGroup.destroyEach();
          life= life-1
          }
    if (life===0){
        gameState= "end"
        }
   }
    
  drawSprites();
  
  if (gameState=== "end"){
    background(0);
    fill("white");
    textSize(80);
    bg.velocityY=0;
    text("Game Over!", 750, 350);
  }

  fill("white");
  textSize(30);
  text(score, 750,40);
  
  text("life "+ life, 200,40);
}

function spawnEnemies() {
  if (frameCount % 60 === 0) {
    var enemies= createSprite(400,0,40,10);
    enemies.y = random(10,700);
    enemies.scale = 0.2;
    enemies.velocityX = -6;
    
    enemies.addImage(enemy);
  
    enemies.lifetime = 700/enemies.velocityX;
    enemyGroup.add(enemies);
  
  }
  
}
