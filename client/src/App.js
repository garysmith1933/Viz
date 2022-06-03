import React, { useState, useEffect } from 'react'
import Sketch from 'react-p5';
import 'p5/lib/addons/p5.sound';

let currentSound;
let fft;

// react-p5 has this so we can use p5 methods outside of draw, and set up.
  const myp5 = new window.p5()
   //to get access to the function on line 21, I need to get the prototype of this instance of P5 constructor
  const P5 = Object.getPrototypeOf(myp5).constructor
 

function App() {
  const [audio, setAudio] = useState('')
  
  //function that is passed to the sketch component as a prop
  const setup = (p, canvasParentRef) => {
    console.log(p)
    p.createCanvas(200, 200).parent(canvasParentRef)
    fft = new P5.FFT()
  console.log(fft)
  }
  
    //function that is passed to the sketch component as a prop
  const draw = (p) => {
    p.background(255, 130, 20)
    p.ellipse(100, 100, 100)
    p.ellipse(300, 100, 100)
    
    // const wave = fft.waveForm()
    
    //   for (let i = 0; i < p.width; i++) {
    //   let index = p.map()
    // }
    
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
  
    // const playSong = () => {
    //   // fft.analyze()
    //   currentSound.play()
    //   console.log("song starting")
    // }

  
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