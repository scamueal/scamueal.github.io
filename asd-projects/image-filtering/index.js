// This is a small program. There are only two sections. This first section is what runs
// as soon as the page loads.
$(document).ready(function () {
  render($("#display"), image);
  $("#apply").on("click", applyAndRender);
  $("#reset").on("click", resetAndRender);
});

/////////////////////////////////////////////////////////
//////// event handler functions are below here /////////
/////////////////////////////////////////////////////////

// this function resets the image to its original value; do not change this function
function resetAndRender() {
  reset();
  render($("#display"), image);
}

// this function applies the filters to the image and is where you should call
// all of your apply functions
function applyAndRender() {
  // Multiple TODOs: Call your apply function(s) here
  applyFilter(reddify);
  applyFilterNoBackground(decreaseBlue);
  applyFilterNoBackground(increaseGreenByBlue);

  // do not change the below line of code
  render($("#display"), image);
}

/////////////////////////////////////////////////////////
// "apply" and "filter" functions should go below here //
/////////////////////////////////////////////////////////

// TODO 1, 2 & 4: Create the applyFilter function here

// causes a filter to be appiled to luigi after clicking the "Apply Filter" button
function applyFilter(filterFunction) {
  for (let i = 0; i < image.length; i++) {
    for (let j = 0; j < image[i].length; j++) {

      var rgbString = image[i][j];

      var rgbNumbers = rgbStringToArray(rgbString);

      filterFunction(rgbNumbers);

      rgbString = rgbArrayToString(rgbNumbers);

      image[i][j] = rgbString;
    }
  }
}

// TODO 7: Create the applyFilterNoBackground function

// applies a filter to the image without changing the background color
function applyFilterNoBackground(filterFunction) {
  for (let i = 0; i < image.length; i++) {
    for (let j = 0; j < image[i].length; j++) {
      var rgbString = image[i][j];
      var backgroundColor = image[0][0]
      if (rgbString !== backgroundColor) {
        var rgbNumbers = rgbStringToArray(rgbString);
        filterFunction(rgbNumbers);
        rgbString = rgbArrayToString(rgbNumbers);
        image[i][j] = rgbString;
      }
    }
  }
}

// TODO 5: Create the keepInBounds function

// makes sure color values stay between 0 and 255
function keepInBounds(number) {
  number < 0 ? number = 0 : (number > 255 ? number = 255 : number = number);
  return number;
}

console.log(keepInBounds(-30)); // should print 0
console.log(keepInBounds(300)); // should print 255
console.log(keepInBounds(127)); // should print 127

// TODO 3: Create reddify function

// makes the image become more red by changing the red value to 200
function reddify(array) {
  array[RED] = 200;
}

// TODO 6: Create more filter functions

// makes the image less blue by subtracting 50 from the blue value
function decreaseBlue(barr) {
  barr[BLUE] = barr[BLUE] - 50;
  barr[BLUE] = keepInBounds(barr[BLUE]);
}

// makes the image more green by adding the blue value to the green value
function increaseGreenByBlue(garr) {
  garr[GREEN] = keepInBounds(garr[BLUE] + garr[GREEN]);
  garr[GREEN] = keepInBounds(garr[GREEN]);
}

// CHALLENGE code goes below here