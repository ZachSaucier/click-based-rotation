ClickBasedRotation
==================

Rotate an element depending on the click location

## Usage
 - Include the `cbrotation.js` or `cbrotation.min.js` file (usually at the bottom of the `body`)
 - Add the `rot-dir` class to any element(s) you want to have the effect
 - (optional) Set any of the data-attributes listed below to valid, custom values

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

`rot-amount` - **Only applies to `simple` type**. The number of degrees to turn each click - defaults to `15`

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
    >This has every attribute used</div>

#### Windows 8 Tile effect

    <div class="rot-dir" data-rot-type="simple" data-rot-origin="opposite">I'm a Windows 8 tile</div>