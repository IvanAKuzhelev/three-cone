# Cone app (Gatsby frontend).
*Three.js as the WebGl library(BufferGeometry)
*React Context for the state management
*Emotion.js for CSS
*Dark mode utilizing local storage and OS preference

## Updates implementation.
	Right now, each time a new triangulation is received completely new geometry(and mesh) is created. This is because a difference in the number of triangles leads to a difference in the needed elements in the buffer array.
	An alternative solution would be allocating arrays of some arbitrary big size from the start and checking whether the new triangulation requires a bigger array size. If so create new geometry, else update elements of the buffer arrays by looping through them.

Live: https://3d.iak.codes/

Backend: https://github.com/IvanAKuzhelev/three-gatsby-figure-backend
