import React, { useState, useEffect } from 'react'
import Sketch from 'react-p5';
import 'p5/lib/addons/p5.sound';

//I was playing around with the look of the visualizer. Feel free to mess around with this yourselves. 

let currentSound;
let fft;
let angle = 0

// react-p5 has this so we can use p5 methods outside of draw, and set up.
  const myp5 = new window.p5()
   //to get access to the fft function in setup, I need to get the prototype of this instance of P5 constructor
  const P5 = Object.getPrototypeOf(myp5).constructor
 

const Visualizer = () => {
  const [audio, setAudio] = useState('')
  
  //function that is passed to the sketch component as a prop
  const setup = (p, canvasParentRef) => {
    p.createCanvas(p.windowWidth, p.windowHeight).parent(canvasParentRef)
    fft = new P5.FFT()
  }
  
    //function that is passed to the sketch component as a prop
  const draw = (p) => {
    p.background("#243A73")

    const pieces = 50;
    
     // Circle's radius
  const radius = 200;

  // Move the origin to the center of the canvas
  p.translate( p.width/2, p.height/2 );

  // The centered circle
  p.stroke('#37E2D5');
  p.ellipse( 0, 0, radius );

  //may keep this commented out for now -GS

  // For each piece draw a line
  // for( let i = 0; i < pieces; i++ ) {
  //   // Rotate the point of origin
  //   p.rotate( p.TWO_PI / pieces );
    
  //   // Draw the red lines
  //       p.push()
  //   p.stroke('white');
  //   p.rotate(angle)
  //   p.line( 10, radius/2, 0, 140 );

  //   // p.stroke( 0 );
  //   // p.line( -10, radius/2, 0, 140 ); 
  //   p.pop()
  // }
  angle -= p.radians(0.3)
  
    // This is what catches the pitches
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
    
    //sets color for bass line - This is currently yellow.
    p.stroke("#FBCB0A");
    // Draw the bass lines
    p.line( mapBass, radius/2, 0, radius )
  
   
    p.push()
    //sets the color for mid lines - This is currently blue
    p.stroke('#37E2D5');
    p.rotate(angle)
     // Draw the mid lines
    p.line( mapMid, 300, 0, radius );
    p.line( -mapMid, 300, 0, radius );   
    p.pop()

    // angle += p.radians(0.3)

    //sets the color for treble lines - This is currently yellow
    p.stroke("#C70A80");
    // Draw the treble lines
    p.line( mapTreble, 1, 0, 140 );        
    
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

  
  //in chrome, the pause feature will work once and then go back to the first time you paused it. However, this works as it should in Mozilla Firefox
  const mouseClicked = () => {
     if (currentSound.isPlaying()) {
       if(currentSound) {
        currentSound.pause()
       }
      
       }
        else {
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

export default Visualizer