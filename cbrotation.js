var drs = document.getElementsByClassName("directional-rotate"),
    isAnimating = false, // LATER: Add individual ones
    animElem,
    type = "simple", // Options: realistic, segmented, simple
    transOrigin = 'center center',
    duration = .1, // In seconds
    amount = 15, // Affects segmented & simple; In degrees
    ease = "ease-out";

for(var i = 0; i < drs.length; i++) { 
  drs[i].style.webkitTransition = "-webkit-transform " + duration + "s " + ease;
  drs[i].style.MozTransition = "-moz-transform " + duration + "s " + ease;
  drs[i].style.msTransition = "-ms-transform " + duration + "s " + ease;
  drs[i].style.OTransition = "-o-transform " + duration + "s " + ease;
  drs[i].style.transition = "transform " + duration + "s " + ease;
  
  drs[i].style.webkitTransformOrigin = transOrigin;
  drs[i].style.MozTransformOrigin = transOrigin;
  drs[i].style.msTransformOrigin = transOrigin;
  drs[i].style.OTransformOrigin = transOrigin;
  drs[i].style.transformOrigin = transOrigin;
  
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
      mX = e.clientX - dr.offsetLeft,
      mY = e.clientY - dr.offsetTop,
      midX = width / 2,
      midY = height / 2,
      maxSide = Math.max(width, height);
  
  if(type == "realistic") {
    var dX = midX - mX,
        dY = midY - mY,
        maxD = midX + midY,
        d = Math.abs(dX) + Math.abs(dY),
        myTrans;
    
    if((dY < 0 && dX < 0) || (dY >= 0 && dX >= 0)) {
      myTrans = "translateZ(" + (-(maxD - d) / 8) + "px) rotateY(" + -dX / 8 + "deg) rotateX(" + dY / 4 + "deg)"; 
    } else {
      myTrans = "translateZ(" + (-(maxD - d) / 8) + "px) rotateY(" + -dX / 8 + "deg) rotateX(" + dY / 4 + "deg)"; 
    }        
    
    trans(dr, myTrans);
  } else if(type == "segmented") {
    if(mX <= midX + width / 8 && mX >= midX - width / 8) { // CenterX
      if(mY <= midY + width / 8 && mY >= midX - width / 8) { // Center center
        rotate(dr, 'c');
      } else {
        if(mY <= midY) {  // Center top
          rotate(dr, 't');
        } else {
          rotate(dr, 'b'); // Center bottom
        }
      }
    } else if(mY <= midY + width / 8 && mY >= midX - width / 8) { // CenterY
      if(mX <= midX) { 
        rotate(dr, 'l'); // Center left
      } else {
        rotate(dr, 'r'); // Center right
      }
    }

    if(mY <= midY) {                           // Top
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
      if(mX <= midX + width / 8 && mX >= midX - width / 8) { // Bottom center
          rotate(dr, 'b');          
      } else if(mX <= width / 2) {                     // Bottom left
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
  } else if(type == "simple") {
    if(mY <= height / 2) {                     // Top
      if(mX <= width / 2) {                      // Top left
        if(mX >= mY) {                             // Top left top
          rotate(dr, 't');
        } else {                                   // Top left bottom
          rotate(dr, 'l');
        }
      } else {                                   // Top right
        if(mX + mY <= maxSide) {                   // Top right top
          rotate(dr, 't');
        } else {                                   // Top right bottom
          rotate(dr, 'r');
        }
      }
    } else {                                  // Bottom
      if(mX <= width / 2) {                     // Bottom left
        if(mX + mY <= maxSide) {                   // Bottom left top
          rotate(dr, 'l');
        } else {                                   // Bottom left bottom
          rotate(dr, 'b');
        }
      } else {                                  // Bottom right
        if(mX - width / 2 >= mY - height / 2) {    // Bottom right top
          rotate(dr, 'r');
        } else {                                   // Bottom right bottom
          rotate(dr, 'b');
        }
      }
    }
  }
}

function rotate(dr, dir) {
  if(!isAnimating) {
    isAnimating = true;
    if(dir == 'c') {
      trans(dr, "translateZ(-" + amount / 2 + "px)");
    } else if(dir == 't') {
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