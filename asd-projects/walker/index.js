/* global $, sessionStorage */

$(document).ready(runProgram); // wait for the HTML / CSS elements of the page to fully load, then execute runProgram()


function runProgram() {
 ////////////////////////////////////////////////////////////////////////////////
 //////////////////////////// SETUP /////////////////////////////////////////////
 ////////////////////////////////////////////////////////////////////////////////


 // Constant Variables
 var FRAME_RATE = 60;
 var FRAMES_PER_SECOND_INTERVAL = 1000 / FRAME_RATE;
 const KEY = {
   LEFT: 37,
   UP: 38,
   RIGHT: 39,
   DOWN: 40
 }
 // Game Item Objects
 var walker = {
   positionX: 0,
   speedX: 0,
   positionY: 0,
   speedY: 0
 }


 // one-time setup
 var interval = setInterval(newFrame, FRAMES_PER_SECOND_INTERVAL);   // execute newFrame every 0.0166 seconds (60 Frames per second)
 $(document).on('keydown', handleKeyDown);                           // change 'eventType' to the type of event you want to handle
 $(document).on('keyup', handleKeyUp);




 ////////////////////////////////////////////////////////////////////////////////
 ///////////////////////// CORE LOGIC ///////////////////////////////////////////
 ////////////////////////////////////////////////////////////////////////////////


 /*
 On each "tick" of the timer, a new frame is dynamically drawn using JavaScript
 by calling this function and executing the code inside.
 */
 function newFrame() {
   repositionGameItem(walker);
   redrawGameItem(walker);
   wallCollision(walker);


   requestAnimationFrame(newFrame);
 }
 newFrame();


 /*
 Called in response to events.
 */
 function handleKeyDown(event) {
   if (event.which === KEY.LEFT) {
     walker.speedX = -.1;
   } else if (event.which === KEY.RIGHT) {
     walker.speedX = .1;
   } else if (event.which === KEY.UP) {
     walker.speedY = -.1;
   } else if (event.which === KEY.DOWN) {
     walker.speedY = .1;
   }
 }
 function handleKeyUp(event) {
   if (event.which === KEY.LEFT) {
     walker.speedX = 0;
   }
   else if (event.which === KEY.UP) {
     walker.speedY = 0;
   }
   else if (event.which === KEY.RIGHT) {
     walker.speedX = 0;
   }
   else if (event.which === KEY.DOWN) {
     walker.speedY = 0;
   }
 }




 ////////////////////////////////////////////////////////////////////////////////
 ////////////////////////// HELPER FUNCTIONS ////////////////////////////////////
 ////////////////////////////////////////////////////////////////////////////////
 function repositionGameItem(gameItem) {
   gameItem.positionX += gameItem.speedX;
   gameItem.positionY += gameItem.speedY;
 }
 function redrawGameItem(gameItem) {
   $("#walker").css({
     "left": gameItem.positionX + "px",
     "top": gameItem.positionY + "px"
   });
 }
 function wallCollision(){
   const boardWidth = $("#board").width();
   const boardHeight = $("#board").height();
   if (walker.positionX <= 0) {
       walker.speedX = 0;
   }
   if (walker.positionX >= boardWidth) {
       walker.speedX = 0;
   }
   if (walker.positionY <= 0) {
       walker.speedY = 0;
   }
   if (walker.positionY >= boardHeight) {
       walker.speedY = 0;
   }
 }


 function endGame() {
   // stop the interval timer
   clearInterval(interval);


   // turn off event handlers
   $(document).off();
 }


}


