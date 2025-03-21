function drawcanyon() {
  for (var i = 0; i < canyonx_pos.length; i++) {
    noStroke();
    fill(146, 118, 77);
    rect(canyonx_pos[i] - 15, floorPos_y, 130, 180);

    var spikeCount = 7; // Number of spikes
    var spikeWidth = 130 / spikeCount;
    var spikeHeight = 30;

    fill(0);
    for (var j = 0; j < spikeCount; j++) {
      var spikeX = canyonx_pos[i] - 15 + j * spikeWidth;
      var spikeY = floorPos_y + 170;

      triangle(
        spikeX,
        spikeY, // left point
        spikeX + spikeWidth / 2,
        spikeY - spikeHeight, // top point
        spikeX + spikeWidth,
        spikeY // right point
      );
    }
    if (
      gameChar_x > canyonx_pos[i] &&
      gameChar_x < canyonx_pos[i] + 100 &&
      gameChar_y >= floorPos_y
    ) {
      isPlummeting = true;
      gameChar_y += 5;
    }
  }
}

function drawcollectibles(i_collectible) {
  for (var i = 0; i < i_collectible.length; i++) {
    if (
      dist(
        gameChar_x,
        gameChar_y,
        i_collectible[i].x_pos,
        i_collectible[i].y_pos
      ) < 50 &&
      i_collectible[i].isFound == false
    ) {
      i_collectible[i].isFound = true;
      gamescore += 1;
      coincollectingsounds.play();
    }
    if (i_collectible[i].isFound == false) {
      fill(211, 211, 211);
      ellipse(i_collectible[i].x_pos, i_collectible[i].y_pos, 20, 28);

      if (i_collectible[i].x_pos == 3080) {
        fill(218, 165, 32);
        ellipse(i_collectible[i].x_pos, i_collectible[i].y_pos, 20, 28);
      }
    }
  }
}
function drawtrees() {
  for (var i = 0; i < tree_posx.length; i++) {
    fill(181, 101, 29);
    rect(tree_posx[i] - 15, floorPos_y - 120, 35, 120);
    fill(34, 139, 34);
    triangle(
      tree_posx[i] - 60,
      floorPos_y - 110,
      tree_posx[i],
      floorPos_y - 180,
      tree_posx[i] + 60,
      floorPos_y - 110
    );
    triangle(
      tree_posx[i] - 60,
      floorPos_y - 160,
      tree_posx[i],
      floorPos_y - 230,
      tree_posx[i] + 60,
      floorPos_y - 160
    );
  }
}
function drawmountains() {
  for (var i = 0; i < mountain.length; i++) {
    fill(119, 113, 105);
    triangle(
      mountain[i].x_pos,
      mountain[i].y_pos,
      mountain[i].x_pos + 80,
      mountain[i].y_pos - 247,
      mountain[i].x_pos + 200,
      mountain[i].y_pos
    );
  }
}

function drawclouds() {
  for (var i = 0; i < cloud.length; i++) {
    fill(211, 211, 211);
    ellipse(cloud[i].x_pos, cloud[i].y_pos, 105, 45);
    ellipse(cloud[i].x_pos, cloud[i].y_pos, 55, 65);
    ellipse(cloud[i].x_pos - 30, cloud[i].y_pos, 55, 60);
    ellipse(cloud[i].x_pos + 35, cloud[i].y_pos, 55, 60);
    cloud[i].x_pos += 1;
    if (cloud[i].x_pos > width + camerapos_x) {
      cloud[i].x_pos = camerapos_x;
    }
  }
}

function birdsandbombs() {
  //birds
  fill(236, 100, 75);
  ellipse(birds_posx[0], floorPos_y - 400, 35);
  fill(255, 165, 0);
  triangle(
    birds_posx[0] + 30,
    floorPos_y - 400,
    birds_posx[0] + 15,
    floorPos_y - 395,
    birds_posx[0] + 15,
    floorPos_y - 408
  );
  fill(255);
  ellipse(birds_posx[0] + 8, floorPos_y - 410, 8, 8);
  birds_posx[0] += 3;

  //bombs is falling
  for (var i = 0; i < bombs_posx.length; i++) {
    if (
      dist(
        birds_posx[0],
        floorPos_y - 400,
        bombs_posx[i],
        bombs_posy[i].y_pos
      ) < 30
    ) {
      bombs_posy[i].bombisfalling = true;
      bombs_posy[i].bombcolour = true;
    }
    if (bombs_posy[i].bombisfalling == true) {
      bombs_posy[i].y_pos += 5;
    }
    if (bombs_posy[i].y_pos >= floorPos_y) {
      bombs_posy[i].bombisfalling = false;
      bombs_posy[i].y_pos = -100;
    }
    if (bombs_posy[i].bombcolour == true) {
      fill(0);
    } else {
      fill(200, 180, 255);
    }
    ellipse(bombs_posx[i], bombs_posy[i].y_pos, 15);

    if (dist(gameChar_x, gameChar_y, bombs_posx[i], bombs_posy[i].y_pos) < 40) {
      isDead = true;
    }
  }
}
function createplatform(x, y, length) {
  var p = {
    x: x,
    y: y,
    length: length,
    draw: function () {
      fill(139, 69, 19);
      rect(this.x, this.y, this.length, 20);
    },
    contact: function (gc_x, gc_y) {
      if (gc_x > this.x && gc_x < this.x + this.length) {
        var d = gc_y - this.y;
        if (d >= 0 && d < 15) {
          return true;
        }
      }
      return false;
    },
  };
  return p;
}

function piggies(x, y, range) {
  this.x = x;
  this.y = y;
  this.range = range;

  this.currentX = x;
  this.inc = 1;
  this.update = function () {
    this.currentX += this.inc;
    if (this.currentX >= this.x + this.range) {
      this.inc = -1;
    } else if (this.currentX < this.x) {
      this.inc = 1;
    }
  };
  this.draw = function () {
    this.update();
    fill(120, 200, 80); // Green color
    ellipse(this.currentX, this.y, 50); // Body

    // Ears
    ellipse(this.currentX - 15, this.y - 20, 12);
    ellipse(this.currentX + 15, this.y - 20, 12);

    // Eyes
    fill(255);
    ellipse(this.currentX - 10, this.y - 6, 12);
    ellipse(this.currentX + 10, this.y - 6, 12);
    fill(0);
    ellipse(this.currentX - 10, this.y - 6, 4);
    ellipse(this.currentX + 10, this.y - 6, 4);

    // Snout
    fill(100, 180, 50);
    ellipse(this.currentX, this.y + 6, 20, 14);
    fill(0);
    ellipse(this.currentX - 5, this.y + 6, 4);
    ellipse(this.currentX + 5, this.y + 6, 4);
  };

  this.contact = function (gameChar_x, gameChar_y) {
    var d = dist(gameChar_x, gameChar_y, this.currentX, this.y);
    if (d < 40) {
      return true;
    }
    return false;
  };
}

function lake() {
  noStroke();
  fill(62, 164, 240);
  rect(1450, floorPos_y, 800, 500);
  if (
    gameChar_x > 1450 &&
    gameChar_x < 1450 + 800 &&
    gameChar_y >= floorPos_y
  ) {
    isPlummeting = true;
    gameChar_y += 5;
  }
}
function Bullet(x, y, dir) {
  this.x = x;
  this.y = y;
  this.dir = dir;
  this.age = 0;

  this.draw = function () {
    fill(255, 0, 0);
    rectMode(CENTER);
    rect(this.x, this.y, 20, 10, 5); // The last value adds rounded edges
  };

  this.move = function () {
    this.x += this.dir;
    this.age++;
  };
}
function drawBullets() {
  for (var i = 0; i < bullets.length; i++) {
    bullets[i].draw();
  }
}

function moveBullets() {
  for (var i = 0; i < bullets.length; i++) {
    bullets[i].move();
  }
}
function movingpltform(x, y, length) {
  var p = {
    x: x,
    y: y,
    currentX: x,
    length: length,
    inc: 1,
    draw: function () {
      fill(139, 69, 19);
      rect(this.currentX, this.y, this.length, 20);
    },
    move: function () {
      this.currentX += this.inc;
      if (this.currentX > this.x + 200) {
        this.inc = -1;
      } else if (this.currentX < this.x) {
        this.inc = 1;
      }
    },
    contact: function (gc_x, gc_y) {
      if (gc_x > this.currentX && gc_x < this.currentX + this.length) {
        var d = gc_y - this.y;
        if (d >= 0 && d < 15) {
          return true;
        }
      }
      return false;
    },
  };
  return p;
}
class Extralives {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  draw() {
    noStroke();
    fill(210, 180, 140);
    ellipse(this.x, this.y - 51, 28);
    fill(0);
    ellipse(this.x - 7, this.y - 53, 4);
    ellipse(this.x + 7, this.y - 53, 4);
    stroke(0);
    strokeWeight(2);
    line(this.x - 5, this.y - 45, this.x + 5, this.y - 45);
  }

  contact(gc_x, gc_y) {
    let d = dist(gc_x, gc_y, this.x, this.y - 51);
    return d < 40;
  }
}
