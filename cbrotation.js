var drs = document.getElementsByClassName("directional-rotate");

for(var i = 0; i < drs.length; i++) { 
  drs[i].onclick = function(e) {
    dRotate(e, this);
  }
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
        console.log("Top left top")
      } else {                                   // Top left bottom
        console.log("Top left bottom")
      }
    } else {                                   // Top right
      if(mX + mY <= maxSide) {                   // Top right top
        console.log("Top right top")
      } else {                                   // Top right bottom
        console.log("Top right bottom")
      }
    }
  } else {                                  // Bottom
    if(mX <= width / 2) {                     // Bottom left
      if(mX + mY <= maxSide) {                   // Bottom left top
        console.log("Bottom left top")
      } else {                                   // Bottom left bottom
        console.log("Bottom left bottom")
      }
    } else {                                  // Bottom right
      if(mX - width / 2 >= mY - height / 2) {    // Bottom right top
        console.log("Bottom right top")
      } else {                                   // Bottom right bottom
        console.log("Bottom right bottom")
      }
    }
  }
}
