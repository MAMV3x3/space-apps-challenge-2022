import React from 'react';
import '../styles/MainPage.css';

function MainPage() {
  return (
    <div>
      <body>
        <div className='main-frame'>
          <div id='titles'>
            <h1>ISS tracker and colission avoidance app</h1>
            <div>By Dagon</div>
          </div>
          <div className='primary-button'>
            <h3>Init project</h3>
          </div>
        </div>
        <div className='section-frame first'>
          <div className='division__section-frame'>
            <div className='content__division__section-frame'></div>
            <h1>Subtitulo</h1>
            <h2>Subtitulo</h2>
          </div>
          <div className='division__section-frame'>
            <img id='img1' src='https://media.discordapp.net/attachments/1026061843279646800/1026061895909781554/iss-png--896.png'/>
          </div>
        </div>
        <div className='section-frame second'>
          <div className='division__section-frame'>
            <div className='content__division__section-frame'></div>
            <h1>Subtitulo</h1>
            <h2>Subtitulo</h2>
          </div>
          <div className='division__section-frame'>
            <img id='img1' src='https://media.discordapp.net/attachments/1026061843279646800/1026061895909781554/iss-png--896.png'/>
          </div>
        </div>
        {/* <div className='section-frame third'>
          <div className='division__section-frame'>
            <div className='content__division__section-frame'></div>
            <h1>Subtitulo</h1>
            <h2>Subtitulo</h2>
          </div>
          <div className='division__section-frame'>
            <img id='img1' src='https://media.discordapp.net/attachments/1026061843279646800/1026061895909781554/iss-png--896.png'/>
          </div>
        </div> */}
      </body>
    </div>
  )
}

export default MainPage
