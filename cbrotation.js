var drs = document.getElementsByClassName("directional-rotate"),
    isAnimating = false, // LATER: Add individual ones
    animElem,
    // LATER: Add differing transform-origins
    duration = .15, // In seconds
    amount = 35, // In degrees
    ease = "ease-in-out";

for(var i = 0; i < drs.length; i++) { 
  drs[i].style.webkitTransition = "-webkit-transform " + duration + "s " + ease;
  drs[i].style.MozTransition = "-moz-transform " + duration + "s " + ease;
  drs[i].style.msTransition = "-ms-transform " + duration + "s " + ease;
  drs[i].style.OTransition = "-o-transform " + duration + "s " + ease;
  drs[i].style.transition = "transform " + duration + "s " + ease;
  
  drs[i].onmousedown = function(e) {
    dRotate(e, this);
    animElem = this;
  }
}

document.body.onmouseup = function() {
  trans(animElem, "rotate(0)");
  isAnimating = false;
}

function dRotate(e, dr) {
  var width = dr.clientWidth,
      height = dr.clientHeight,
      maxSide = Math.max(width, height)
      mX = e.clientX - dr.offsetLeft,
      mY = e.clientY - dr.offsetTop;
    
  if(mY <= height / 2) {                     // Top
    if(mX <= width / 2) {                      // Top left
      if(mX >= mY) {                             // Top left top
        rotate(dr, "tl");
      } else {                                   // Top left bottom
        rotate(dr, "lt");
      }
    } else {                                   // Top right
      if(mX + mY <= maxSide) {                   // Top right top
        rotate(dr, "tr");
      } else {                                   // Top right bottom
        rotate(dr, "rt");
      }
    }
  } else {                                  // Bottom
    if(mX <= width / 2) {                     // Bottom left
      if(mX + mY <= maxSide) {                   // Bottom left top
        rotate(dr, "lb");
      } else {                                   // Bottom left bottom
        rotate(dr, "bl");
      }
    } else {                                  // Bottom right
      if(mX - width / 2 >= mY - height / 2) {    // Bottom right top
        rotate(dr, "rb");
      } else {                                   // Bottom right bottom
        rotate(dr, "br");
      }
    }
  }
}

function rotate(dr, dir) {
  if(!isAnimating) {
    isAnimating = true;
    if(dir == 't') {
      trans(dr, "rotateX(" + amount + "deg)");
    } else if(dir == 'r') {
    trans(dr, "rotateY(" + amount + "deg)"); 
    } else if(dir == 'b') {
      trans(dr, "rotateX(-" + amount + "deg)");
    } else if(dir == 'l') {
      trans(dr, "rotateY(-" + amount + "deg)");
    } else if(dir == 'tl') {
      trans(dr, "rotate3d(2, -1, 0, " + amount + "deg)");
    } else if(dir == 'tr') {
      trans(dr, "rotate3d(2, 1, 0, " + amount + "deg)");
    } else if(dir == 'rt') {
      trans(dr, "rotate3d(1, 2, 0, " + amount + "deg)");
    } else if(dir == 'rb') {
      trans(dr, "rotate3d(-1, 2, 0, " + amount + "deg)");
    } else if(dir == 'br') {
      trans(dr, "rotate3d(-2, 1, 0, " + amount + "deg)");
    } else if(dir == 'bl') {
      trans(dr, "rotate3d(-2, -1, 0, " + amount + "deg)");
    } else if(dir == 'lb') {
      trans(dr, "rotate3d(-1, -2, 0, " + amount + "deg)");
    } else if(dir == 'lt') {
      trans(dr, "rotate3d(1, -2, 0, " + amount + "deg)");
    }
  }
}

function trans(dr, val) {
  dr.style.webkitTransform = val;
  dr.style.MozTransformTransform = val;
  dr.style.msTransform = val;
  dr.style.OTransform = val;
  dr.style.transform = val;
}