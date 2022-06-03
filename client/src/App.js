import React, { useState, useEffect } from 'react'
import Sketch from 'react-p5';
import 'p5/lib/addons/p5.sound';

let currentSound;
let fft;
let FFT

// react-p5 has this so we can use p5 methods outside of draw, and set up.
  const myp5 = new window.p5()
   //to get access to the function on line 18, I need to get the prototype of this instance of P5 constructor
  const P5 = Object.getPrototypeOf(myp5).constructor
 

function App() {
  const [audio, setAudio] = useState('')
  
  //function that is passed to the sketch component as a prop
  const setup = (p, canvasParentRef) => {
    console.log(p)
    p.createCanvas(p.windowWidth, p.windowHeight).parent(canvasParentRef)
    fft = new P5.FFT()
  console.log(Object.getPrototypeOf(fft))
  
  }
  
    //function that is passed to the sketch component as a prop
  const draw = (p) => {
    p.background(255, 130, 20)

    
    const pieces = 50;
    
     // Circle's radius
  const radius = 200;

  // Move the origin to the center of the canvas
  p.translate( p.width/2, p.height/2 );

  // The centered circle
  p.stroke( 0, 0, 255 );
  p.ellipse( 0, 0, radius );

  // For each piece draw a line
  for( let i = 0; i < pieces; i++ ) {
    
    // Rotate the point of origin
    p.rotate( p.TWO_PI / pieces );
    
    // Draw the red lines
    p.stroke( 255, 0, 0 );
    p.line( 10, radius/2, 0, radius );
    
    //Optionally also draw to the opposite direction
    p.stroke( 0 );
    p.line( -10, radius/2, 0, radius ); 
  }
  
    // Run the FFT analysis
  fft.analyze();

  // Get the volumes of different frequency ranges
  const bass    = fft.getEnergy("bass");
  const mid     = fft.getEnergy("mid");     
  const treble  = fft.getEnergy("treble");

  // Map the range of each volume with your desired numbers 
  const mapBass     = p.map( bass, 0, 255, -100, 100 );
  const mapMid      = p.map( mid, 0, 255, -150, 150 );
  const mapTreble   = p.map( treble, 0, 255, -200, 200 );

  
  for( let i = 0; i < pieces; i++ ) {
    
    p.rotate( p.TWO_PI / pieces );
    
    // Draw the bass lines
    p.line( mapBass, radius/2, 0, radius );
    
    // Draw the mid lines
    p.line( mapMid, radius/2, 0, radius );    

    // Draw the treble lines
    p.line( mapTreble, radius/2, 0, radius );        
    
    }
  }

  //sets the currentSound to the audio
  const preload = () => {
    currentSound = myp5.loadSound(audio)
    console.log(currentSound)
  }
  
    //any time audio is changed, run preload
  useEffect(() => {
    preload()
  },[audio])

  
  //current problem is that if i press once, it gets invoked twice, thus leading to a pause then play.
  const mouseClicked = () => {
    console.log(currentSound.isPlaying())
     if (currentSound.isPlaying()) {
                if (currentSound){
                    currentSound.pause()
                }
            } else {
                  fft.analyze()
                currentSound.play()
            }
  }    
  
  
  return (
    <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
      <div>
        <Sketch setup={setup} draw={draw} preload={preload} mouseClicked={mouseClicked} />
      </div>
      
      <input type="file" name="file" accept="audio/*" onChange={(event) => setAudio(event.target.files[0])}/>
      <button> Play </button>
      {audio ? 'there is audio' : 'we no have that'}
    </div>
    )
  
}

export default App