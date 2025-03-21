var gameChar_x;
var gameChar_y;
var floorPos_y;
var isLeft;
var isRight;
var isfalling;
var isPlummeting;
var isFound;
var x_pos;
var y_pos;
var isDead;
var lives;
var gamescore;
var gamecomepletedsound;
var checkpoint;
var platforms;
var onplatform;
var characterhead;
var piggies;
var createpiggies;
var iscontact;
var coincollectingsounds;
var gameoversounds;
var gamewinplayed;
var gameoverplayed;
var gamecomepleted;
var lake;
var moveBullets;
var drawBullets;
var totalbullets;
var bulletshot;
var backgroundmusic;
var backgroundmusicoverplayed;
var isfallingplayed;
var movingplatform;
var gamestate;
//start page

function preload() {
  soundFormats("mp3", "wav");

  //load your sounds here

  gamecomepletedsound = loadSound("assets/gamecompleted.wav");
  gamecomepletedsound.setVolume(0.1);

  coincollectingsounds = loadSound("assets/coin.wav");
  coincollectingsounds.setVolume(0.1);

  gameoversounds = loadSound("assets/gameover.wav");
  gameoversounds.setVolume(0.1);

  backgroundmusic = loadSound("assets/background.wav");
  backgroundmusic.setVolume(0.1);

  jumpsound = loadSound("assets/jump.wav");
  jumpsound.setVolume(0.1);

  fallingsound = loadSound("assets/falling.wav");
  fallingsound.setVolume(0.1);

  shootingsound = loadSound("assets/shooting.wav");
  shootingsound.setVolume(0.1);
}

function setup() {
  createCanvas(1300, 650);
  startgame();
  gamestate = "intro";
  lives = 3;
}

function draw() {
  if (gamestate == "intro") {
    intropage();
  } else if (gamestate == "playing") {
    playgame();
  }
}
function playgame() {
  camerapos_x = gameChar_x - width / 2;
  background(200, 180, 255); //fill the sky blue

  if (!backgroundmusicoverplayed) {
    backgroundmusic.play();
    backgroundmusicoverplayed = true;
  }

  noStroke();
  fill(0, 155, 0);
  rect(0, floorPos_y, width, height - floorPos_y); //draw some green ground

  push();

  translate(-camerapos_x, 0);

  //mountains
  drawmountains();
  //cloud
  drawclouds();

  // tree
  drawtrees();

  //collect the collectible
  drawcollectibles(collectible);

  // birds and bombs
  birdsandbombs();

  for (var i = 0; i < platforms.length; i++) {
    platforms[i].draw();
    platforms[i].contact(gameChar_x, gameChar_y);
  }

  drawcanyon();
  lake();

  //the game character
  if (isLeft && isfalling) {
    isleftfalling();
  } else if (isRight && isfalling) {
    // add your jumping-right code
    isRightfalling();
  } else if (isLeft) {
    goingleft();
  } else if (isRight) {
    goingright();
  } else if (isfalling || isPlummeting) {
    // add your jumping facing forwards code
    isfallingplummeting();
  } else if (isDead) {
    Dead();
  } else {
    standingstill();
    // add your standing front facing code
  }
  if (isPlummeting == false) {
    if (isLeft == true && gameChar_x > -300) {
      gameChar_x -= 5;
    }
    if (isRight == true && gameChar_x < 5500) {
      gameChar_x += 5;
    }
  }

  if (gameChar_y < floorPos_y) {
    onplatform = false;
    for (var i = 0; i < platforms.length; i++) {
      platforms[i].draw();
      if (platforms[i].contact(gameChar_x, gameChar_y)) {
        isfalling = false;
        onplatform = true;
        gameChar_y = platforms[i].y;
      }
    }
    if (!onplatform) {
      gameChar_y += 2;
    }
  }

  onplatform = false;
  for (var i = 0; i < movingplatform.length; i++) {
    movingplatform[i].draw();
    movingplatform[i].move();
    if (movingplatform[i].contact(gameChar_x, gameChar_y)) {
      isfalling = false;
      onplatform = true;
      gameChar_y = movingplatform[i].y;
      gameChar_x += movingplatform[i].inc;
    }
  }

  if (isPlummeting == true) {
    isLeft = false;
    isRight = false;
    isfalling = false;
    isPlummeting = false;

    if (!isfallingplayed) {
      fallingsound.play();
      isfallingplayed = true;
    }
    if (gameChar_y > 700) {
      isDead = true;
    }
  }

  xcheckpoint();

  if (checkpoint.isReached == false) {
    checkcheckpoint();
  }

  for (var i = 0; i < createpiggies.length; i++) {
    createpiggies[i].draw();

    if (createpiggies[i].contact(gameChar_x, gameChar_y)) {
      isDead = true;
    }
  }

  rezz();

  drawBullets();
  moveBullets();

  bulletswhicharefar();
  checkIfAnyBulletsHitpiggies();
  for (var i = extralives.length - 1; i >= 0; i--) {
    extralives[i].draw();
    if (extralives[i].contact(gameChar_x, gameChar_y)) {
      extralives.splice(i, 1);
      lives++;
    }
  }

  pop();
  characterhead();
  noStroke();

  fill(0);
  textSize(30);
  text("score :" + gamescore, 1050, 50);
  text("lives :", 50, 50);

  gamewin();
}

function keyPressed() {
  // if statements to control the animation of the character when
  // keys are pressed.
  if (gamestate == "intro" && keyCode == 32) {
    gamestate = "playing";
  }
  if (keyCode == 37) {
    console.log("left arrow");
    isLeft = true;
  }
  if (keyCode == 39) {
    console.log("right arrow");
    isRight = true;
  }
  if (keyCode == 38 && (gameChar_y == floorPos_y || ifisonplatform())) {
    console.log("up arrow");
    isfalling = true;
    gameChar_y -= 100;
    onplatform = false;
    jumpsound.play();

    if (keyCode == 32) {
      console.log("space");
      startgame();
    }
  }

  if (bulletshot < totalbullets) {
    // Check if bullets are still available
    if (keyCode == 65) {
      // Left bullet
      if (!isfalling) {
        var bullet = new Bullet(gameChar_x, gameChar_y - 20, -2.5);
        bullets.push(bullet);
        bulletshot++; // Increase total bullet count
      }
      shootingsound.play();
    }

    if (keyCode == 68) {
      // Right bullet
      if (!isfalling) {
        var bullet = new Bullet(gameChar_x, gameChar_y - 20, 2.5);
        bullets.push(bullet);
        bulletshot++; // Increase total bullet count
      }
      shootingsound.play();
    }
  }
}

function keyReleased() {
  console.log("keyReleased: " + key);
  console.log("keyReleased: " + keyCode);
  if (keyCode == 37) {
    console.log("left arrow");
    isLeft = false;
  }
  if (keyCode == 39) {
    console.log("right arrow");
    isRight = false;
  }
  if (keyCode == 38) {
    console.log("up arrow");
    isfalling = false;
  }
}
function ifisonplatform() {
  for (var i = 0; i < platforms.length; i++) {
    if (platforms[i].contact(gameChar_x, gameChar_y)) {
      return true;
    }
  }
  for (var i = 0; i < movingplatform.length; i++) {
    if (movingplatform[i].contact(gameChar_x, gameChar_y)) {
      return true;
    }
  }
  return false;
}

function rezz() {
  if (isDead) {
    lives -= 1;
    isDead = false;
    gameChar_x = width / 2;
    gameChar_y = floorPos_y;
    isfallingplayed = false;
  }
  if (lives < 1) {
    gameover();
    // put a blank screen and say game over
  }
}

function characterhead() {
  for (var i = 0; i < lives; i++) {
    let x = 150 + 50 * i;
    let y = 94;
    noStroke();
    fill(210, 180, 140);
    ellipse(x, y - 51, 28);
    fill(0);
    ellipse(x - 7, y - 53, 4);
    ellipse(x + 7, y - 53, 4);
    stroke(0);
    strokeWeight(2);
    line(x - 5, y - 45, x + 5, y - 45);
  }
}

function gameover() {
  background(220, 20, 60);
  textSize(50);
  fill(255);
  textAlign(CENTER);
  text("GAME OVER, BETTER LUCK NEXT TIME!!!", width / 2, height / 2);
  text("thank you for playing", width / 2, height / 2 + 70);
  isLeft = false;
  isRight = false;
  isfalling = false;

  if (!gameoverplayed) {
    gameoversounds.play();
    gameoverplayed = true;
    backgroundmusic.stop();
  }
}

function gamewin() {
  if (checkpoint.isReached == true && gamescore >= 5) {
    background(133, 127, 177);
    textSize(50);
    fill(255);
    textAlign(CENTER);
    text("YOU WONNN!!! LESSGOOO", width / 2, height / 2);
    text("thank you for playing", width / 2, height / 2 + 70);
    if (!gamecomepleted) {
      gamecomepletedsound.play();
      gamecomepleted = true;
      backgroundmusic.stop();
    }
  }
}

function bulletswhicharefar() {
  for (var j = bullets.length - 1; j >= 0; j--) {
    var bullet = bullets[j];
    if (bullet.age > 100) {
      bullets.splice(j, 1);
    }
  }
}
function checkIfAnyBulletsHitpiggies() {
  for (var i = createpiggies.length - 1; i >= 0; i--) {
    var enemy = createpiggies[i];
    for (var j = bullets.length - 1; j >= 0; j--) {
      var bullet = bullets[j];
      var d = dist(enemy.currentX, enemy.y, bullet.x, bullet.y);
      print(d);
      if (d < 25) {
        bullets.splice(j, 1);
        createpiggies.splice(i, 1);
      }
    }
  }
}

function intropage() {
  background(125, 67, 150);
  fill(255);
  textSize(40);
  textAlign(CENTER);
  noStroke();
  text("WELCOME TO PIGGY'S ISLAND", width / 2, height / 2 - 100);

  textSize(20);
  text("Steal all the eggs and cook them!", width / 2, height / 2 - 50);
  text(
    "You have to steal at least 5 eggs to win this game.",
    width / 2,
    height / 2 - 20
  );

  text("Controls:", width / 2, height / 2 + 20);
  text(" left arrow to move Left", width / 2, height / 2 + 50);
  text("right arrow to move Right", width / 2, height / 2 + 80);
  text("up arrow to jump", width / 2, height / 2 + 110);
  text("'A' and 'D' to Shoot", width / 2, height / 2 + 140);

  textSize(18);
  text("Collect your head to gain extra lives!", width / 2, height / 2 + 170);
  text("Avoid the piggies!", width / 2, height / 2 + 195);

  textSize(22);
  text("Press SPACE to start!", width / 2, height / 2 + 240);
  text("Good Luck!", width / 2, height / 2 + 270);

  let headX = width / 2 + 170;
  let headY = height / 2 + 215;
  fill(210, 180, 140);
  ellipse(headX, headY - 51, 28);
  fill(0);
  ellipse(headX - 7, headY - 53, 4);
  ellipse(headX + 7, headY - 53, 4);
  stroke(0);
  strokeWeight(2);
  line(headX - 5, headY - 45, headX + 5, headY - 45);

  fill(255, 0, 0);
  noStroke()
  textSize(25);
  text("WARNING!! Watch out for the bombs dropped by the bird...they can land anywhere!",width / 2,height / 2 + 300);
}
