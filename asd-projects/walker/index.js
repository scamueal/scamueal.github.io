/* global $, sessionStorage */

$(document).ready(runProgram); // wait for the HTML / CSS elements of the page to fully load, then execute runProgram()

function runProgram() {
  ////////////////////////////////////////////////////////////////////////////////
  //////////////////////////// SETUP /////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  // Constant Variables
  var FRAME_RATE = 60;
  var FRAMES_PER_SECOND_INTERVAL = 1000 / FRAME_RATE;

  // turns magic numbers into words
  var KEY = {
    ENTER: 13,
    LEFT: 37,
    UP: 38,
    RIGHT: 39,
    DOWN: 40,
  };

  // Game Item Objects
  var walker = {   
    "positionX" : 0,
    "positionY" : 0,
    "speedX" : 0,
    "speedY" : 0,
  };

  // one-time setup
  var interval = setInterval(newFrame, FRAMES_PER_SECOND_INTERVAL);   // execute newFrame every 0.0166 seconds (60 Frames per second)
  $(document).on('keydown', handleKeyDown);                           // run key down
  $(document).on('keyup', handleKeyUp);                               // run key up

  ////////////////////////////////////////////////////////////////////////////////
  ///////////////////////// CORE LOGIC ///////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  /* 
  On each "tick" of the timer, a new frame is dynamically drawn using JavaScript
  by calling this function and executing the code inside.
  */
 
  function newFrame() {           // runs everything in it
    repositionGameItem();
    wallCollision();
    redrawGameItem();
  }

  /* 
  Called in response to events.
  */

 // when a key is pressed, walker goes in that direction
  function handleKeyDown(event) {
    if (event.which === KEY.ENTER) {                 // when enter is pressed, console.log
      console.log("enter pressed");
    }
    else if (event.which === KEY.LEFT) {             // when left arrow is pressed, walker goes left
      console.log("left pressed");
      walker.speedX = -5;
    }
    else if (event.which === KEY.UP) {               // when up arrow is pressed, walker goes up
      console.log("up pressed");
      walker.speedY = -5;
    }
    else if (event.which === KEY.RIGHT) {            // when right arrow is pressed, walker goes right
      console.log("right pressed");
      walker.speedX = 5;
    }
    else if (event.which === KEY.DOWN) {             // when down is pressed, walker goes down
      console.log("down pressed");
      walker.speedY = 5;
    }
  }

  // when a key is released, walker stops
  function handleKeyUp(event) {
    if (event.which === KEY.ENTER) {                 // when enter is released, console.log
      console.log("enter released");
    }
    else if (event.which === KEY.LEFT) {             // when left arrow is released, walker stops
      console.log("left released");
      walker.speedX = 0;
      walker.speedY = 0;
    }
    else if (event.which === KEY.UP) {               // when up arrow is released, walker stops
      console.log("up released");
      walker.speedX = 0;
      walker.speedY = 0;
    }
    else if (event.which === KEY.RIGHT) {            // when right arrow is released, walker stops
      console.log("right released");
      walker.speedX = 0;
      walker.speedY = 0;
    }
    else if (event.which === KEY.DOWN) {             // when down is released, walker stops
      console.log("down released");
      walker.speedX = 0;
      walker.speedY = 0;
    }
  }

  ////////////////////////////////////////////////////////////////////////////////
  ////////////////////////// HELPER FUNCTIONS ////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  function repositionGameItem() {                 // repositions the GameItem to move along the x and y axis
    walker.positionX += walker.speedX;
    walker.positionY += walker.speedY;
  }

  function redrawGameItem() {                     // redraws the GameItem to move along the x and y axis
    $('#walker').css('left', walker.positionX)
    $('#walker').css('right', walker.positionX)
    $('#walker').css('top', walker.positionY)
    $('#walker').css('bottom', walker.positionY)
  }

  function wallCollision() {                 // when walker touches a wall, it stops
    // if the walker hits the left wall, it stops
    if (walker.positionX <= 0) {
      walker.positionX = 0;
    } 
    // if the walker hits the right wall, it stops
    if (walker.positionX + 50 >= $("#board").width()) {
      walker.positionX = $("#board").width() - 50;
    }
    // if the walker hits the top wall, it stops
    if (walker.positionY <= 0) {
      walker.positionY = 0;
    }
    // if the walker hits the bottom wall, it stops
    if (walker.positionY + 50 >= $("#board").height()) {
      walker.positionY = $("#board").height() - 50;
    }
  }

  function endGame() {
    // stop the interval timer
    clearInterval(interval);

    // turn off event handlers
    $(document).off();
  }

}