function isleftfalling() {
  // head
  fill(210, 180, 140);
  ellipse(gameChar_x, gameChar_y - 51, 28);
  fill(0);
  ellipse(gameChar_x - 3, gameChar_y - 53, 4);
  stroke(0);
  strokeWeight(2);
  line(gameChar_x - 10, gameChar_y - 45, gameChar_x, gameChar_y - 45);
  //body
  fill(0, 255, 0);
  noStroke();
  rect(gameChar_x - 10, gameChar_y - 37, 15, 35);
  //legs
  fill(0);
  rect(gameChar_x - 23, gameChar_y - 10, 20, 7);
  //hands
  fill(0);
  rect(gameChar_x - 30, gameChar_y - 33, 30, 8);
  //boost
  fill(255, 165, 0);
  ellipse(gameChar_x, gameChar_y + 10, 15, 30);
}

function isRightfalling() {
  fill(210, 180, 140);
  ellipse(gameChar_x, gameChar_y - 51, 28);
  fill(0);
  ellipse(gameChar_x + 3, gameChar_y - 53, 4);
  stroke(0);
  strokeWeight(2);
  line(gameChar_x, gameChar_y - 45, gameChar_x + 10, gameChar_y - 45);
  fill(0, 255, 0);
  noStroke();
  rect(gameChar_x - 10, gameChar_y - 37, 15, 30);
  fill(0);
  rect(gameChar_x - 10, gameChar_y - 33, 30, 8);
  rect(gameChar_x - 5, gameChar_y - 13, 20, 7);
  fill(255, 165, 0);
  ellipse(gameChar_x, gameChar_y + 10, 15, 30);
}

function goingleft() {
  fill(210, 180, 140);
  ellipse(gameChar_x, gameChar_y - 51, 28);
  fill(0);
  ellipse(gameChar_x - 3, gameChar_y - 53, 4);
  stroke(0);
  strokeWeight(2);
  line(gameChar_x - 2, gameChar_y - 45, gameChar_x - 10, gameChar_y - 45);

  fill(0, 255, 0);
  noStroke();
  rect(gameChar_x - 10, gameChar_y - 37, 15, 30);

  fill(0);
  rect(gameChar_x - 10, gameChar_y - 10, 6, 13);

  fill(0);
  rect(gameChar_x - 30, gameChar_y - 33, 30, 8);
}

function goingright() {
  fill(210, 180, 140);
  ellipse(gameChar_x, gameChar_y - 51, 28);
  fill(0);
  ellipse(gameChar_x + 3, gameChar_y - 53, 4);
  stroke(0);
  strokeWeight(2);
  line(gameChar_x + 2, gameChar_y - 45, gameChar_x + 10, gameChar_y - 45);

  fill(0, 255, 0);
  noStroke();
  rect(gameChar_x - 10, gameChar_y - 37, 15, 30);

  fill(0);
  rect(gameChar_x - 10, gameChar_y - 10, 6, 15);

  fill(0);
  rect(gameChar_x - 10, gameChar_y - 33, 30, 8);
}

function isfallingplummeting() {
  fill(210, 180, 140);
  ellipse(gameChar_x, gameChar_y - 51, 28);
  fill(0);
  ellipse(gameChar_x - 7, gameChar_y - 53, 4);
  ellipse(gameChar_x + 7, gameChar_y - 53, 4);
  stroke(0);
  strokeWeight(2);
  line(gameChar_x - 5, gameChar_y - 45, gameChar_x + 5, gameChar_y - 45);

  fill(0, 255, 0);
  noStroke();
  rect(gameChar_x - 10, gameChar_y - 37, 22, 30);

  fill(0); //legs
  rect(gameChar_x - 20, gameChar_y - 13, 15, 7);
  rect(gameChar_x + 5, gameChar_y - 13, 15, 7);

  fill(0); //hands
  rect(gameChar_x + 10, gameChar_y - 35, 5, 16);
  rect(gameChar_x - 15, gameChar_y - 35, 5, 16);
  fill(255, 165, 0);
  ellipse(gameChar_x, gameChar_y + 10, 15, 30);
}

function Dead() {
  fill(210, 180, 140);
  ellipse(gameChar_x, gameChar_y - 10, 28);
  stroke(0);
  strokeWeight(2);
  fill(0, 255, 0);
  noStroke();
  rect(gameChar_x - 15, gameChar_y - 10, 30, 10);

  fill(0);
  rect(gameChar_x - 15, gameChar_y, 10, 5);
  rect(gameChar_x + 5, gameChar_y, 10, 5);

  fill(0);
  rect(gameChar_x - 20, gameChar_y - 10, 5, 10);
  rect(gameChar_x + 15, gameChar_y - 10, 5, 10);
}

function standingstill() {
  fill(210, 180, 140);
  ellipse(gameChar_x, gameChar_y - 51, 28);
  fill(0);
  ellipse(gameChar_x - 7, gameChar_y - 53, 4);
  ellipse(gameChar_x + 7, gameChar_y - 53, 4);
  stroke(0);
  strokeWeight(2);
  line(gameChar_x - 5, gameChar_y - 45, gameChar_x + 5, gameChar_y - 45);

  fill(0, 255, 0);
  noStroke();
  rect(gameChar_x - 10, gameChar_y - 37, 22, 30);

  fill(0);
  rect(gameChar_x + 10, gameChar_y - 35, 5, 16);
  rect(gameChar_x - 13, gameChar_y - 35, 5, 16);

  fill(0);
  rect(gameChar_x - 12, gameChar_y - 10, 6, 13);
  rect(gameChar_x + 9, gameChar_y - 10, 6, 13);
}
