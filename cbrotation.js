var drs = document.getElementsByClassName("rot-dir"),
    isAnimating = false,
    animElem = drs[0];

for(var i = 0; i < drs.length; i++) { 
  var dataSet = drs[i].dataset,
      duration = dataSet.rotDur || .1,
      ease = dataSet.rotEase || "ease-out",
      transOrigin = dataSet.rotOrigin || "center center";
  
  drs[i].dataset.rotInit = drs[i].dataset.rotInit || "rotate(0deg)";
  trans(drs[i], drs[i].dataset.rotInit);
    
  drs[i].style.webkitTransition = "-webkit-transform " + duration + "s " + ease;
  drs[i].style.MozTransition = "-moz-transform " + duration + "s " + ease;
  drs[i].style.msTransition = "-ms-transform " + duration + "s " + ease;
  drs[i].style.OTransition = "-o-transform " + duration + "s " + ease;
  drs[i].style.transition = "transform " + duration + "s " + ease;

  // Fix FF rendering error
  drs[i].style.outline = "1px solid transparent";
    
  transO(drs[i], transOrigin);
  
  drs[i].onmousedown = drs[i].ontouchstart =  function(e) {
    if(!isAnimating) {
        isAnimating = true;
        if(typeof this.dataset.rotStart !== 'undefined')
          eval(this.dataset.rotStart + "()");
        dRotate(e, this);
        animElem = this;
    }
  }
}

document.body.onmouseup = document.body.ontouchend = function() {
  trans(animElem, animElem.dataset.rotInit);
  isAnimating = false;
  if(typeof animElem.dataset.rotEnd !== 'undefined')
    eval(animElem.dataset.rotEnd + "()");
}

window.onmousemove = function(e) {
    var mX = e.pageX,
        mY = e.pageY;
    if ((mY >= 0 && mY <= window.innerHeight)
      && (mX >= 0 && mX <= window.innerWidth))
      return;
    trans(animElem, animElem.dataset.rotInit);
    isAnimating = false;
    if(typeof animElem.dataset.rotEnd !== 'undefined')
      eval(animElem.dataset.rotEnd + "()");
}

function dRotate(e, dr) {
  var dataSet = dr.dataset,
      type = dataSet.rotType || "realistic",
      amount = dataSet.rotAmount || 15,
      
      width = dr.clientWidth,
      height = dr.clientHeight,
      scrollX = document.body.scrollLeft || document.documentElement.scrollLeft,
      scrollY = document.body.scrollTop || document.documentElement.scrollTop,
      mX = e.clientX - dr.getBoundingClientRect().left + scrollX,
      mY = e.clientY - dr.getBoundingClientRect().top + scrollY,
      midX = width / 2,
      midY = height / 2;
  
  if(type == "realistic") {
    var dX = midX - mX,
        dY = midY - mY,
        maxD = midX + midY,
        d = Math.abs(dX) + Math.abs(dY),
        myTrans = "translateZ(" + (-(maxD - d) / 8) + "px) rotateY(" + -dX / 8 * amount / 15 + "deg) rotateX(" + dY / 4 * amount / 15 + "deg)";       
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
    // Apparently only webkit supports the perspective function...
  if((dr.style.MozTransform == "" && dr.style.transform == "") ||
     (dr.style.msTransform == "" && dr.style.transform == "") ||
     (dr.style.OTransform == "" && dr.style.transform == "")
    ) {
    dr.parentNode.style.perspective = (dr.getAttribute('data-rot-perspective') || 400) + "px";
    dr.style.MozTransform = val;
    dr.style.msTransform = val;
    dr.style.OTransform = val;
    dr.style.transform = val;
  } else {
    dr.style.MozTransform = val;
    dr.style.msTransform = val;
    dr.style.OTransform = val;
    dr.style.transform = val;
  }
    
  val = "perspective(" + (dr.getAttribute('data-rot-perspective') || 400) + ") " + val;
  dr.style.webkitTransform = val;
  dr.style.MozTransform = val;
  dr.style.msTransform = val;
  dr.style.OTransform = val;
  dr.style.transform = val;  
}

function transO(dr, val) {
  dr.style.webkitTransformOrigin = val;
  dr.style.MozTransformOrigin = val;
  dr.style.msTransformOrigin = val;
  dr.style.OTransformOrigin = val;
  dr.style.transformOrigin = val;
}