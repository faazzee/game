function xcheckpoint() {
  push();
  fill(255);
  stroke(60);
  strokeWeight(8);
  line(checkpoint.xpos, floorPos_y, checkpoint.xpos, floorPos_y - 250);
  fill(0);
  if (checkpoint.isReached) {
    noStroke();
    fill(200, 0, 0); // Red color
    ellipse(checkpoint.xpos, floorPos_y - 200, 50, 55);
    // Eyes (White part)
    fill(255);
    ellipse(checkpoint.xpos - 10, floorPos_y - 200, 12, 15);
    ellipse(checkpoint.xpos + 10, floorPos_y - 200, 12, 15);

    // Pupils (Black part)
    fill(0);
    ellipse(checkpoint.xpos - 10, floorPos_y - 200, 5);
    ellipse(checkpoint.xpos + 10, floorPos_y - 200, 5);

    stroke(0);
    strokeWeight(8);
    line(
      checkpoint.xpos - 14,
      floorPos_y - 210,
      checkpoint.xpos - 5,
      floorPos_y - 206
    );
    line(
      checkpoint.xpos + 5,
      floorPos_y - 206,
      checkpoint.xpos + 14,
      floorPos_y - 210
    );

    noStroke();
    fill(255, 255, 0); // Yellow beak
    triangle(
      checkpoint.xpos - 5,
      floorPos_y - 190,
      checkpoint.xpos + 5,
      floorPos_y - 190,
      checkpoint.xpos,
      floorPos_y - 180
    );

    fill(0);
    textSize(50);
  } else {
    noStroke();
    fill(200, 0, 0);
    ellipse(checkpoint.xpos, floorPos_y - 50, 50, 55);

    fill(255);
    ellipse(checkpoint.xpos - 10, floorPos_y - 50, 12, 15);
    ellipse(checkpoint.xpos + 10, floorPos_y - 50, 12, 15);

    fill(0);
    ellipse(checkpoint.xpos - 10, floorPos_y - 50, 5);
    ellipse(checkpoint.xpos + 10, floorPos_y - 50, 5);

    stroke(0);
    strokeWeight(8);
    line(
      checkpoint.xpos - 14,
      floorPos_y - 60,
      checkpoint.xpos - 5,
      floorPos_y - 56
    );
    line(
      checkpoint.xpos + 5,
      floorPos_y - 56,
      checkpoint.xpos + 14,
      floorPos_y - 60
    );

    noStroke();
    fill(255, 255, 0);
    triangle(
      checkpoint.xpos - 5,
      floorPos_y - 40,
      checkpoint.xpos + 5,
      floorPos_y - 40,
      checkpoint.xpos,
      floorPos_y - 30
    );
  }
  pop();
}

function checkcheckpoint() {
  var d = abs(gameChar_x - checkpoint.xpos);
  if (d < 15) {
    console.log(d);
    checkpoint.isReached = true;
  }
}
