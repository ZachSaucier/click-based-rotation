ClickBasedRotation
==================

A project to try and rotate an element depending on where it is clicked

## Usage
 - Include the 
 - Add the `rot-dir` class to any elements you want to have the effect
 - (optional) Set any of the data-attributes listed below you want

### Data-attributes

`rot-type` - Possible values: `realistic` (default) and `simple`

 - `realistic` bases the effect on a calculation of distance from the center
 - `simple` has 1 of 5 preset effects based on where is clicked

`rot-origin` -  The transform origin for the rotation occurring - defaults to `"center center"`

 - Accepts all default CSS `transform-origin` values using the same syntax
 - Also accepts a value of `opposite` which, when the `rot-type` is `simple`, will set the `transform-origin` to the opposite of the rotation direction, creating a rotating door effect

`rot-dur` - The duration, in seconds, of the total transition being applied - defaults to `.1`

`rot-ease` - The easing function applied to the transition, all CSS easing values allowed - defaults to `ease-out`

`rot-perspective` - Sets the perspective for the element's rotation - defaults to `400`

`rot-amount` - **Only applies to `simple` type**. The number of degrees of which to turn each click - defaults to `15`

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
