function startgame() {
  floorPos_y = (height * 3) / 4;
  gameChar_x = width / 2;
  gameChar_y = floorPos_y;
  onplatform = true;
  isLeft = false;
  isRight = false;
  isfalling = false;
  isPlummeting = false;
  bombisfalling = false;
  isDead = false;
  camerapos_x = 0;

  mountain = [
    { x_pos: -200, y_pos: floorPos_y },
    { x_pos: 500, y_pos: floorPos_y },
    { x_pos: 3000, y_pos: floorPos_y },
  ];
  cloud = [
    { x_pos: 910, y_pos: floorPos_y - 350 },
    { x_pos: 200, y_pos: floorPos_y - 350 },
    { x_pos: 500, y_pos: floorPos_y - 350 },
  ];
  tree_posx = [100, 800, 1200, 2500];
  canyonx_pos = [330, 950, 1480, 3850];
  collectible = [
    { x_pos: 1360, y_pos: floorPos_y - 30, isFound: false },
    { x_pos: 500, y_pos: floorPos_y - 30, isFound: false },
    { x_pos: 1680, y_pos: 327, isFound: false },
    { x_pos: 3080, y_pos: floorPos_y - 270, isFound: false },
    { x_pos: 4700, y_pos: floorPos_y - 200, isFound: false },
    { x_pos: 100, y_pos: floorPos_y - 30, isFound: false },
  ];
  birds_posx = [50];
  bombs_posx = [
    300, 550, 800, 1100, 1350, 1680, 2000, 2450, 2800, 3080, 3300, 3600, 3880,
    4300, 4700, 5000, 5300,
  ];
  bombs_posy = [
    { y_pos: floorPos_y - 400, bombisfalling: false },
    { y_pos: floorPos_y - 400, bombisfalling: false },
    { y_pos: floorPos_y - 400, bombisfalling: false },
    { y_pos: floorPos_y - 400, bombisfalling: false },
    { y_pos: floorPos_y - 400, bombisfalling: false },
    { y_pos: floorPos_y - 400, bombisfalling: false },
    { y_pos: floorPos_y - 400, bombisfalling: false },
    { y_pos: floorPos_y - 400, bombisfalling: false },
    { y_pos: floorPos_y - 400, bombisfalling: false },
    { y_pos: floorPos_y - 400, bombisfalling: false },
    { y_pos: floorPos_y - 400, bombisfalling: false },
    { y_pos: floorPos_y - 400, bombisfalling: false },
    { y_pos: floorPos_y - 400, bombisfalling: false },
    { y_pos: floorPos_y - 400, bombisfalling: false },
    { y_pos: floorPos_y - 400, bombisfalling: false },
    { y_pos: floorPos_y - 400, bombisfalling: false },
    { y_pos: floorPos_y - 400, bombisfalling: false },
    { y_pos: floorPos_y - 400, bombisfalling: false },
    { y_pos: floorPos_y - 400, bombisfalling: false },
  ];
  gamescore = 0;
  checkpoint = { isReached: false, xpos: 5300, ypos: floorPos_y - 100 };

  platforms = [];
  platforms.push(createplatform(2400, floorPos_y - 90, 150));
  platforms.push(createplatform(2600, floorPos_y - 150, 150));
  platforms.push(createplatform(2800, floorPos_y - 200, 150));
  platforms.push(createplatform(4350, floorPos_y - 170, 400));
  platforms.push(createplatform(4150, floorPos_y - 90, 150));

  movingplatform = [];
  movingplatform.push(movingpltform(1400, floorPos_y - 90, 150));
  movingplatform.push(movingpltform(1750, floorPos_y - 90, 150));

  createpiggies = [];
  createpiggies.push(new piggies(100, floorPos_y - 30, 200));
  createpiggies.push(new piggies(1150, floorPos_y - 30, 200));
  createpiggies.push(new piggies(2400, floorPos_y - 30, 300));
  createpiggies.push(new piggies(3600, floorPos_y - 30, 200));
  createpiggies.push(new piggies(4350, floorPos_y - 200, 150));

  bullets = [];
  totalbullets = 6;
  bulletshot = 0;

  extralives = [];
  extralives.push(new Extralives(1450, floorPos_y - 50));
  extralives.push(new Extralives(2700, floorPos_y - 170));
}
