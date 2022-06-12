import React, { useState, useEffect } from 'react'
import Sketch from 'react-p5';
import 'p5/lib/addons/p5.sound';

//I was playing around with the look of the visualizer. Feel free to mess around with this yourselves. 

let currentSound;
let fft;
let angle = 0
   
     // Circle's radius
     const radius = 200;
const numOfTriangles = new Array(6)

// react-p5 has this so we can use p5 methods outside of draw, and set up.
  const myp5 = new window.p5()
   //to get access to the fft function in setup, I need to get the prototype of this instance of P5 constructor
  const P5 = Object.getPrototypeOf(myp5).constructor
 

const Visualizer = () => {
  const [audio, setAudio] = useState('')
  
  // function that is passed to the sketch component as a prop
  const setup = (p, canvasParentRef) => {
    p.createCanvas(p.windowWidth, p.windowHeight).parent(canvasParentRef)
    fft = new P5.FFT()
  }
  
    //function that is passed to the sketch component as a prop
  const draw = (p) => {
    //sets the background color
    p.background("#243A73")

    class Triangle {
      constructor(x,y) {
        this.pos = p.createVector(x,y)
        this.vel = p.createVector(this.pos.x,this.pos.y)
        this.angle = null
        this.radius = 200;
      }
  
      draw(a) {
        this.angle = a
        p.push()
          p.translate(p.width/2, p.height/2)
          p.rotate(this.angle)
          //  this.angle = this.vel.heading()
          p.translate(this.pos.x, this.pos.y)
          p.strokeWeight(10)
          p.stroke('red')
          // p.triangle(0,0,-1,-1,-1, 1)
          p.triangle(0,0,-1,-1,-1, 1)
        p.pop()

      //angle for other direction
      //  p.triangle(0,0,-1,1,1,1)
      }
  
      //you need to fix the direction it faces when rotates, this does not work.
      update(a) {
        const p5 = Object.getPrototypeOf(p).constructor
        this.vel = p5.Vector.fromAngle(a)
    
        this.pos.add(this.vel)
        }
    }

    
    //Makes triangle instances 

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

//sets the circle ring
    p.push()
      // Move the origin to the center of the canvas
  p.translate( p.width/2, p.height/2 );
  p.stroke(255)
  p.noFill()
  p.strokeWeight(3)
  p.circle(0,0,radius*2)
  p.pop()

  

  for (let i = 0; i < numOfTriangles.length; i++) {
    let x = radius * p.cos(angle)
    let y = radius * p.sin(angle)
    numOfTriangles[i] = new Triangle(x,y)

    for (let a = 0; a < p.radians(45); a+=p.radians(8)) {
      numOfTriangles[i].update(a)
      numOfTriangles[i].draw(a)
    }
    angle += p.radians(0.05)
  }
}

  //sets the currentSound to the audio
  const preload = () => {
    currentSound = myp5.loadSound(audio)
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

  //have to correct this
  const windowResized = () => {
    myp5.resizeCanvas(myp5.windowWidth, myp5.windowHeight);
  }
  
  
  return (
    <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
      <div>
        <Sketch setup={setup} draw={draw} preload={preload} mouseClicked={mouseClicked} windowResized={windowResized}/>
      </div>
      
      <input type="file" name="file" accept="audio/*" onChange={(event) => setAudio(event.target.files[0])}/>
      <button> Play </button>
      {audio ? 'there is audio' : 'we no have that'}
    </div>
    )
  
}

export default Visualizer