ClickBasedRotation
==================

Rotate an element depending on the click location. Works without jQuery! Yay!

###Demos

 - [Bruce Lee demo](http://codepen.io/Zeaklous/pen/AFEtL)
 - [Non-square shapes demo](http://zachsaucier.github.io/ClickBasedRotation/demo-shapes.html)
 - [Rotation type demo](http://zachsaucier.github.io/ClickBasedRotation/demo-type.html)
 - [Rotation origin demo](http://zachsaucier.github.io/ClickBasedRotation/demo-origin.html)

## Usage
 - Include the `cbrotation.js` or `cbrotation.min.js` file (usually at the bottom of the `body`)
 - Add the `rot-dir` class to any element(s) you want to have the effect
 - (optional) Set any of the data-attributes listed below to valid, custom values
 - You may want to also set `transform-style: preserve-3d` (with other prefixes) on the `rot-dir` element as well, depending on how you want it to feel

Side note: If you want the elements to rotate on mouse move instead, you might look at [this project](http://stackoverflow.com/questions/17790869/rotating-elements-according-to-cursor-position-with-jquery/17795610#17795610)

### Data-attributes

`rot-type` - Possible values: `realistic` (default) and `simple` - [Demo page](http://zachsaucier.github.io/ClickBasedRotation/demo-type.html)

 - `realistic` bases the effect on a calculation of distance from the center
 - `simple` has 1 of 5 preset effects based on where is clicked

`rot-origin` -  The transform origin for the rotation occurring - defaults to `"center center"` - [Demo page](http://zachsaucier.github.io/ClickBasedRotation/demo-origin.html)

 - Accepts all default CSS `transform-origin` values using the same syntax
 - **Only applies to `simple` type**. Also accepts a value of `opposite` which will set the `transform-origin` to the opposite of the rotation direction, creating a rotating door effect

`rot-dur` - The duration, in seconds, of the total transition being applied - defaults to `.1`

`rot-ease` - The easing function applied to the transition, all CSS easing values allowed - defaults to `ease-out`

`rot-perspective` - Sets the perspective for the element's rotation - defaults to `400`

`rot-amount` - The amount to turn each click - defaults to `15`

 - When using it with `simple`,  it is directly the number of degrees to rotate each click
 - When using it with `realistic`, it affects the value by the following

:

    myTrans = "translateZ(" + (-(maxD - d) / 8) + "px) " +
              "rotateY(" + -dX / 8 * amount / 15 + "deg) " +
              "rotateX(" + dY / 4 * amount / 15 + "deg)";

`rot-init` - The transform that the element goes to on start and after a click - defaults to `rotate(0deg)`

`rot-start` - A function to call when the element is clicked - [demo page](http://codepen.io/Zeaklous/pen/AFEtL)

`rot-end` - A function to call when the element is done being clicked

### Example Usage

This will apply the effect using all of the default data values:

    <div class="rot-dir">This is a minimal example</div>

This is an example using every attribute:

    <div class="rot-dir" data-rot-type="simple" 
                         data-rot-origin="opposite" 
                         data-rot-dur=".2" 
                         data-rot-ease="ease-in-out" 
                         data-rot-perspective="800" 
                         data-rot-amount="10"
                         data-rot-init="rotate3d(1,1,0,10deg)"
                         data-rot-start="atStart"
                         data-rot-end="atEnd"
    >This has every attribute used</div>

#### Windows 8 Tile effect

    <div class="rot-dir" data-rot-type="simple" data-rot-origin="opposite">I'm a Windows 8 tile</div>