var drs = document.getElementsByClassName("rot-dir"),
    isAnimating = false,
    animElem;

for(var i = 0; i < drs.length; i++) { 
  var dataSet = drs[i].dataset,
      duration = dataSet.rotDur || .1,
      ease = dataSet.rotEase || "ease-out",
      transOrigin = dataSet.rotOrigin || "center center";
  
  drs[i].style.webkitTransition = "-webkit-transform " + duration + "s " + ease;
  drs[i].style.MozTransition = "-moz-transform " + duration + "s " + ease;
  drs[i].style.msTransition = "-ms-transform " + duration + "s " + ease;
  drs[i].style.OTransition = "-o-transform " + duration + "s " + ease;
  drs[i].style.transition = "transform " + duration + "s " + ease;
  
  transO(drs[i], transOrigin);
  
  drs[i].onmousedown = function(e) {
    if(!isAnimating) {
        isAnimating = true;
        dRotate(e, this);
        animElem = this;
    }
  }
}

document.body.onmouseup = function() {
  trans(animElem, "rotate(0)");
  isAnimating = false;
}

function dRotate(e, dr) {
  var dataSet = dr.dataset,
      type = dataSet.rotType || "realistic",
      
      width = dr.clientWidth,
      height = dr.clientHeight,
      mX = e.clientX - dr.offsetLeft  + document.body.scrollLeft,
      mY = e.clientY - dr.offsetTop + document.body.scrollTop,
      midX = width / 2,
      midY = height / 2;
  
  if(type == "realistic") {
    var dX = midX - mX,
        dY = midY - mY,
        maxD = midX + midY,
        d = Math.abs(dX) + Math.abs(dY),
        myTrans;
    console.log(mX + " " + mY);
    if((dY < 0 && dX < 0) || (dY >= 0 && dX >= 0)) {
      myTrans = "translateZ(" + (-(maxD - d) / 8) + "px) rotateY(" + -dX / 8 + "deg) rotateX(" + dY / 4 + "deg)"; 
    } else {
      myTrans = "translateZ(" + (-(maxD - d) / 8) + "px) rotateY(" + -dX / 8 + "deg) rotateX(" + dY / 4 + "deg)"; 
    }    
    trans(dr, myTrans);
      
  } else if(type == "simple") {
    var maxSide = Math.max(width, height),
        transOrigin = dataSet.rotOrigin || "center center";
      
    if(mX <= midX + width / 8 && mX >= midX - width / 8 && mY <= midY + height / 8 && mY >= midY - height / 8) { // Center
        rotate(dr, 'c');
    } else if(mY <= height / 2) {              // Top
      if(mX <= width / 2) {                      // Top left
        if(mX >= mY) {                             // Top left top
          rotate(dr, 't');
          if(transOrigin == "opposite") {
            transO(dr, 'bottom center');
          }
        } else {                                   // Top left bottom
          rotate(dr, 'l');
          if(transOrigin == "opposite") {
            transO(dr, 'right center');
          }
        }
      } else {                                   // Top right
        if(mX + mY <= maxSide) {                   // Top right top
          rotate(dr, 't');
          if(transOrigin == "opposite") {
            transO(dr, 'bottom center');
          }
        } else {                                   // Top right bottom
          rotate(dr, 'r');
          if(transOrigin == "opposite") {
            transO(dr, 'left center');
          }
        }
      }
    } else {                                  // Bottom
      if(mX <= width / 2) {                     // Bottom left
        if(mX + mY <= maxSide) {                   // Bottom left top
          rotate(dr, 'l');
          if(transOrigin == "opposite") {
            transO(dr, 'right center');
          }
        } else {                                   // Bottom left bottom
          rotate(dr, 'b');
          if(transOrigin == "opposite") {
            transO(dr, 'top center');
          }
        }
      } else {                                  // Bottom right
        if(mX - width / 2 >= mY - height / 2) {    // Bottom right top
          rotate(dr, 'r');
          if(transOrigin == "opposite") {
            transO(dr, 'left center');
          }
        } else {                                   // Bottom right bottom
          rotate(dr, 'b');
          if(transOrigin == "opposite") {
            transO(dr, 'top center');
          }
        }
      }
    }
  }
}

function rotate(dr, dir) {  
  var amount = dr.dataset.rotAmount || 15;
  if(dir == 'c') {
    trans(dr, "translateZ(-" + amount + "px)");
  } else if(dir == 't') {
    trans(dr, "rotateX(" + amount + "deg)");
  } else if(dir == 'r') {
    trans(dr, "rotateY(" + amount + "deg)"); 
  } else if(dir == 'b') {
    trans(dr, "rotateX(-" + amount + "deg)");
  } else if(dir == 'l') {
    trans(dr, "rotateY(-" + amount + "deg)");
  }
}

function trans(dr, val) {
  dr.style.webkitTransform = "perspective(" + (dr.getAttribute('data-rot-perspective') || 400) + ") " + val;
  dr.style.MozTransformTransform = "perspective(" + (dr.getAttribute('data-rot-perspective') || 400) + ") " + val;
  dr.style.msTransform = "perspective(" + (dr.getAttribute('data-rot-perspective') || 400) + ") " + val;
  dr.style.OTransform = "perspective(" + (dr.getAttribute('data-rot-perspective') || 400) + ") " + val;
  dr.style.transform = "perspective(" + (dr.getAttribute('data-rot-perspective') || 400) + ") " + val;
}

function transO(dr, val) {
  dr.style.webkitTransformOrigin = val;
  dr.style.MozTransformTransformOrigin = val;
  dr.style.msTransformOrigin = val;
  dr.style.OTransformOrigin = val;
  dr.style.transformOrigin = val;
}