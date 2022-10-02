import React from 'react';
import '../styles/MainPage.css';

function MainPage() {
  return (
    <div>
      <body>
        <div className='main-frame'>
          <div id='titles'>
            <h1>ISS tracker and collision avoidance app</h1>
            <span className = "concatenacion">
              <span className ='dist'>▫️</span>
              <span className = 'dist teamName'>Dagon</span>
            </span>
          </div>
          <div className='primary-button'>
            <h3>Launch App</h3>
          </div>
        </div>
        <div className='section-frame first'>
          <div className='division__section-frame-mayor'>
            <div className='content__division__section-framen division-box'>
              <h1>Objective</h1>
              <h2>The iss tracker and collision avoidance app, provide the user with the capacity to watch in real time the position of the International Space Station, including avoids of imminent collisions with scrap, the location of all the satellites in our space. All this in a 3D map, where you can navigate free, knowing with a point your own position showing you the position and ilumination from the sun, with this you can also view when the ISS is going to be at the top of your city/country.</h2>
            </div>
          </div>
        </div>
        <div className='section-frame second'>
          <div className='division__section-frame-mayor-mayor'>
            <div className='content__division__section-framen division-box'>
              <h1>Technologies and knowledge</h1>
              <h2>Our web aplication is written in JavaScript with Node, React and Three.js. The 3D render is rendered ffor React-three-fiber. Wich help us to representate the earth, the ISS and the position and ilumination of the sun. We are using a DATA of all the satellites in our space, provided by a TLE from Celestrak and an API provided form Open Notify which provides us the ISS position in real time.
                  Our calculations use to mention some mathematical topics, the latitud and azimuth, probability equations to calculate the collisions of the ISS with space scrap and approaches with others satellites.
                  For computational rendering of satellites and debris, we used TLE data from GOES, and NORAD using Celestrak.
              </h2>
            </div>
          </div>
        </div>
        <div className="separator">
          <div className='section-frame'>
            <div className='division__section-frame-menor'>
              <div className='content__division__section-frame'></div>
              <h1>Goal</h1>
              <h2>With this proyect, we would like to show to the visitants to our web site, a new window of opportunities areas, where they can learn and then colaborate in investigations or applications of all the new knowledge which we have in our hands day to day.</h2>
            </div>
            <div className='division__section-frame-menor'>
              <img id='img1' src='https://media.discordapp.net/attachments/1026061843279646800/1026061895909781554/iss-png--896.png'/>
            </div>
          </div>
        </div>
        <div className='section-frame third'>
          <div className='division__section-frame-mayor-mayor'>
            <div className='content__division__section-framen'>
              <h1>Satellite tracking implementation</h1>
            </div>
          </div>
        </div>
        <footer>
          <nav className='colaborator'>
            <h1>About Us</h1>
            <h2>We are a group, conformated of students that search new opportunities to develop our knowledge and take advantage of the events to learn something new.</h2>
            <img id='img2' src='https://cdn.discordapp.com/attachments/716441619661979678/1026054021896740884/Colorway2-Color_White.png'/>
            <img id='img3' src='https://media.discordapp.net/attachments/716441619661979678/1026004831212687431/LFN_Dagon.png?width=1084&height=670'/>
          </nav>
        </footer>
      </body>
    </div>
    
  )
}

export default MainPage

