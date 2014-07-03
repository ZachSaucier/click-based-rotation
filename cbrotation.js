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
        rotate(dr, "top");
      } else {                                   // Top left bottom
        rotate(dr, "left");
      }
    } else {                                   // Top right
      if(mX + mY <= maxSide) {                   // Top right top
        rotate(dr, "top");
      } else {                                   // Top right bottom
        rotate(dr, "right");
      }
    }
  } else {                                  // Bottom
    if(mX <= width / 2) {                     // Bottom left
      if(mX + mY <= maxSide) {                   // Bottom left top
        rotate(dr, "left");
      } else {                                   // Bottom left bottom
        rotate(dr, "bottom");
      }
    } else {                                  // Bottom right
      if(mX - width / 2 >= mY - height / 2) {    // Bottom right top
        rotate(dr, "right");
      } else {                                   // Bottom right bottom
        rotate(dr, "bottom");
      }
    }
  }
}

function rotate(dr, dir) {
  if(!isAnimating) {
    isAnimating = true;
    if(dir == 'top') {
        trans(dr, "rotateX(" + amount + "deg)");
    } else if(dir == 'right') {
      trans(dr, "rotateY(" + amount + "deg)");
    } else if(dir == 'bottom') {
        trans(dr, "rotateX(-" + amount + "deg)");
    } else {
        trans(dr, "rotateY(-" + amount + "deg)");
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