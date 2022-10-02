# ISS tracker and collision avoidance web app

**High-Level Project Summary 💻** <br><br>
The ISS tracker and collision avoidance web app by Dagon, is an open-source web app, where the user can know the actual location of the International Space Station, check for real coalitions alerts with space trash and space debris, satellites and space bodies detected and located with the Satellite.js library, in a 3D space, which simulates the world, its atmosphere,  the International Space Station and the illumination of the sun, all this at real time with real data. <br><br>

**Detailed Project Description 🤖** <br><br>
Our proposal includes development of the ISS tracking and mapping in a 3D space, as well as a collision prediction estimate. Our tracking system was developed as a web application written in JavaScript with Node and React and Three.js. We implemented a rendered for Three.js called React-three-fiber which allows us to load 3D models of the ISS itself, the nearby satellites, and all the space trash data into a $ℝ^3$ space. <br>
The application relies on the TLE data provided from Celestrak (considering NORAD and NASA's GOES data) and an API provided from Open Notify which provides us the ISS position in real time. <br>
The first problem we run into when processing this data is converting geodetic coordinates to Cartesian coordinates in $ℝ^3$ space. For this, we rely on the ECEF coordinate system, which, in our model, allows us to leave the earth static and make the satellites orbit around it. In this coordinate system, the Z-axis coincides with the minor axis of the reference ellipsoid. the X-axis runs from the origin through a point on the equatorial plane at the zero meridian. the Y-axis is perpendicular to the X-axis on the equatorial plane (you can see it in the following image). <br><br>
![image](https://user-images.githubusercontent.com/84588180/193464886-cdcddc55-021b-4158-9b2c-564798be3f46.png) <br><br>
Geodetic coordinates (latitude ϕ, longitude λ, height h) can be converted into ECEF coordinates using the following equation: <br>
- $X = (N(ϕ) + h)⋅cosϕ⋅cosλ$
- $Y = (N(ϕ) + h)⋅cosϕ⋅sinλ$
- $Z = ((b^2/a^2)⋅N(ϕ) + h)⋅sinϕ$ <br><br>

For our model we approximate the earth to a perfect sphere, for the sake of simplicity, so that, the previous equations can be expressed as the following:
- $X = (h)⋅cosϕ⋅cosλ$
- $Y = (h)⋅cosϕ⋅sinλ$
- $Z = (h)⋅sinϕ$ <br><br>

We get both latitude and longitude of the ISS via an API call, then we apply the formulas shown above and with that we get the ISS position in our $ℝ^3$ space. In that point we can load and render the 3D model of the ISS. Then we only need to update this coordinate in real time by making continuous calls to the API so that we can project the orbit. <br>
Now, we need to think about how to make the solar panels of the 3D model to always be pointing at the sun, to do this, we use the solar panels of the model as a plane, then, we get the sun position relative to the prime meridian using the SunCalc library, we get the azimuth and the distance in return, and we can apply the same formulas shown above to convert this to cartesian coordinates using the azimuth as longitude and the distance as latitude. With these coordinates, we can project a point light in our $ℝ^3$ space. We calculate the normal vector between the plane of the solar panels of our 3D model and the point light and the normal vector perpendicular to the center of our 3D model (you can see it in the following image). <br><br>
![image](https://user-images.githubusercontent.com/84588180/193465246-afa98164-ff53-44b7-9e86-393a3591b1cf.png) <br><br>
With all this, we calculate the offset angle between both vectors by applying cross product, and we just simply need to orient our plane relative to that angle. Finally, using the normal vector that we already know, we use quaternions to orient the figure correctly by rotating it around itself about the other axes. <br>
Then, to use the TLE data provided from Celestrak first we need to filter it, we make the API rest call, we get in response records of active and inactive satellites, we save this data in an array and then we iterate through the array to process it to rearrange the data in a format that is easier to interpret. <br>
With the help of the Satellite.js library, we apply simplified perturbations models to the given data (such as SGP4) to calculate orbital state vectors of satellites and space debris relative to the Earth-centered inertial coordinate system. These models predict the effect of perturbations caused by the Earth’s shape, drag, radiation, and gravitation effects from other bodies such as the sun and moon. <br>
To finish, calculating the probability of collision between two objects X and Y: <br>
We define $P(X)$ as the probability of being in one segment of the orbit. <br>
In that way:
- $P(X-being-in-given-segment-per-second) = k⋅(S/L)$ in the interval $[0, 1] = (1 - e^s/L) = ϕ$ <br><br>

So that, we know the following:
- $P(X∩Y) = (volume-of-intersection-area * 2)/(total-volume-of-both-objects-in [0, 1])$ <br><br>

We get:
- $P_(collision)(Y | 2-satellites-in-same-space)$ $= P(X∩Y)/P(X)$ $= (φ_1 ⋅ φ_2 ⋅ φ_3∙∙∙ ⋅ φ_n) / (σ_1 ⋅ σ_2 ⋅ σ_3∙∙∙ ⋅ σ_n)$ <br><br>

This probability will for sure be influenced by the wider of the orbit and the velocity, it means the longer the orbit the less chances to collide but the more velocity in the object the greater the chances to collide with some other object with less velocity. <br><br>

**Space Agency Data 🚀** <br><br>

For computational rendering of satellites and debris, we used TLE data from GOES, and NORAD using Celestrak. <br><br>

*Made for NASA space apps challenge 2022*


