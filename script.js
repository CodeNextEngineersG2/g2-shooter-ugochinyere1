// UI Variables
var canvas;
var gameScreen;
var scoreDisplay;
var canvasWidth = 500;
var canvasHeight = 400;
var gameLevel = 0;


// Game Variables
var gameRunning;
var shipShooting;
var alienShooting;
var score;

// Ship Variables
var shipDiameter;
var shipX;
var shipY;
var shipSpeed;
var shipColor;

// Bullet Variables
var bulletDiameter;
var bulletX;
var bulletY;

// Alien Variables
var alienDiameter;
var alienX;
var alienY;
var alienVelocity;

// Alien Bullet Variables
var alienBulletDiameter;
var alienBulletX;
var alienBulletY;

function setup() {



    canvas = createCanvas(canvasWidth, canvasHeight);
    gameScreen = select('#game-screen');
    canvas.parent(gameScreen);
    scoreDisplay = select("#score-display");
    resetGame();

}

function draw() {

    checkGameLevel()

    if (gameRunning){
        
        drawShip();
        drawAlien();

        if (shipShooting == true) {
            drawBullet();
        }

        if (alienShooting == true) {
            drawAlienBullet();
        }

    }
}

function drawShip() {

    fill(196, 255, 237);
    ellipse(shipX, shipY, shipDiameter, shipDiameter);

    if (keyIsDown(LEFT_ARROW) && shipX > shipDiameter / 2) {
        shipX -= shipSpeed;
    } else if (keyIsDown(RIGHT_ARROW) && shipX < width - shipDiameter / 2) {
        shipX = shipSpeed + shipX;
    }

}

function keyPressed() {

    if (keyCode === 32 && shipShooting == false && gameRunning) {

        bulletX = shipX;
        bulletY = shipY;

        shipShooting = true;
    }
}

function drawBullet() {

    var hitAlien = checkCollision(alienX, alienY, alienDiameter, bulletX, bulletY, bulletDiameter);

    if (bulletY > 0 && !hitAlien) {
        fill(196, 255, 237);
        ellipse(bulletX, bulletY, bulletDiameter, bulletDiameter);

        //snip
        bulletY -= 12;

    } else if (hitAlien) {
        resetAlien();
        alienVelocity++;
        shipShooting = false;

        score++;
        gameLevel++;
        scoreDisplay.html(score);

    } else {

        shipShooting = false
    }



}

function drawAlien() {

    fill(123, 0, 0);
    ellipse(alienX, alienY, alienDiameter, alienDiameter);
    alienX = alienX + alienVelocity;
    if (alienX >= width - alienDiameter / 2 || alienX <= 0 - alienDiameter / 2) {
        alienVelocity = alienVelocity * -1
        alienX + alienVelocity

    }

    if (random(4) < 1 && !alienShooting) {

        alienBulletX = alienX;
        alienBulletY = alienY;

        alienShooting = true;

    }

}

function drawAlienBullet() {

    var hitShip = checkCollision(alienBulletX, alienBulletY, alienBulletDiameter, shipX, shipY, shipDiameter);

    if (alienBulletY < canvasHeight && !hitShip) {

        fill(40, 40, 40);

        ellipse(alienBulletX, alienBulletY, alienBulletDiameter, alienBulletDiameter);

        alienBulletY += 9;



    } else if (hitShip) {

        gameOver();

    } else {

        alienShooting = false;
    }




}

function checkCollision(aX, aY, aD, bX, bY, bD) {

    var distance = dist(aX, aY, bX, bY);
    if ((aD / 2 + bD / 2) >= distance) {
        return true;
    } else {
        return false;
    }
}

function resetAlien() {

    alienX = alienDiameter / 2;
    alienY = alienDiameter / 2;

    alienVelocity = abs(alienVelocity);

}

function gameOver() {

    gameRunning = false;
    alert("Game Over Your Final Score is:" + score);

    setup();

}

function resetGame() {

    shipColor = "#00ff00";
    

    shipColor = "#ddfff7";
    shipDiameter = 100;
    shipSpeed = 15;
    shipX = 250;
    shipY = 350;

    bulletDiameter = 20;

    shipShooting = false;

    alienDiameter = 50;
    alienVelocity = 10;
    alienX = alienDiameter / 2;
    alienY = alienDiameter / 2;

    alienBulletDiameter = 12;

    alienShooting = false;

    score = 0;
    scoreDisplay.html(score);
    gameRunning = true;

    gameLevel = 0
}

function checkGameLevel() {
  
  if (gameLevel == 0) {

            background((225, 225, 225));

  }else if (gameLevel == 1) {

            background((100, 0, 100));

  }else if (gameLevel == 2) {

            background((225, 0, 0));

  }else if (gameLevel == 3) {

            background((0, 225, 0));

  }else if (gameLevel >= 3) {

            background((0, 0, 225));

  }

   }
    


    /* DONE setup()
     * This function is called once. Sets up the canvas, accesses HTML elements with
     * select(), and adds event listeners to those elements. Sets initial values of
     * variables by calling resetGame().
     */


    /*
     * gameOver()
     * This function stops the game from running and shows an alert telling the
     * player what their final score is. Finally it resets the game by calling
     * resetGame()
     */


    /*
     * resetGame()
     * This function "resets the game" by initializing ship, alien, and game
     * variables.
     */


    /*
     * draw()
     * This function animates the ship, alien, and both kinds of bullets, but only
     * if the game is running.
     */


    /*
     * drawShip()
     * This function draws the player's ship. It also controls the ship's
     * x value by checking if the player is holding down the left or right keys.
     */


    /*
     * keyPressed()
     * This function runs automatically when the player presses the spacebar
     * (keyCode === 32). If they do, and a bullet is not currently being fired
     * ("shipShooting" variable is false), it positions the bullet relative to the
     * ship. Then it sets the "shipShooting" variable to "true", indicating a ship
     * bullet is currently being fired.
     */


    /*
     * drawBullet()
     * This function draws a bullet. It also checks to see if the bullet has hit
     * the alien. If it has, the alien is reset to the top-left of the screen
     * and the player earns a point. The alien aslo becomes faster (i.e., harder
     * to hit) each time it is hit by a bullet.
     */


    /*
     * drawAlien()
     * This function draws an alien. It also checks to see if the alien has touched
     * the player's ship. If it has, the function calls gameOver().
     */


    /*
     * drawAlienBullet()
     * This function behaves much like drawBullet(), only it fires from the alien
     * and not the player's ship. If the bullet hits the player, it's game over.
     */


    /*
     * resetAlien()
     * This function sets the alien to its original position at the top-left of
     * the screen. It also sets its velocity to its absolute value (so, if the
     * velocity was negative when it died, it becomes positive upon reset, making
     * it always start by moving to the right).
     */


    /*
     * checkCollision(aX, aY, aD, bX, bY, bD)
     * This function first calculates the distance between two circles based on
     * their X and Y values. Based on the distance value, the function returns
     * "true" if the circles are touching, and false otherwise.
     * Circles are considered touching if
     * (distance <= (circle1Diameter + circle2Diameter) / 2)
     */