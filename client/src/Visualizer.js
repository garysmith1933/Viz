import React, { useState, useEffect } from 'react'
import Sketch from 'react-p5';
import 'p5/lib/addons/p5.sound';

//I was playing around with the look of the visualizer. Feel free to mess around with this yourselves. 

let currentSound;
let fft;
let angles = [45, 45, 45, 45, 45]
let selectedPalette = 0
let swap
let windowResized

//An array of colors to pick from. - Will set up later colors[0][0]
const colors = 
[
//Considering setting the ones thats not the base to be color templates based on the tempo of the song, ex: engergetic, slow.. Not sure. -GS

  //Base - I ll fight over this one
  ['#ffbe0b','#fb5607','#ff006e','#8338ec','#3a86ff'],

  //Something random
  ['#0d3b66','#faf0ca','f4d35e','#ee964b','#f95738'],

  //Earthy somewhat
  ['#264653','#2a9d8f','#e9c46a','#f4a261','#e76f51'],

  //Not sold on this one
  ['#231942','#5e548e','#9f86c0','#be95c4','#e0b1cb'],

  //Cotton Candy
  ["#cdb4db","#ffc8dd",'#ffafcc', '#bde0fe', '#a2d2ff']

]

   
// Circle's radius
let radius = 100;
const radiusMultiplier = [1, 1.5, 2,2.5,3]
const numOfCircles = 5
const anglePos = [0,0,0,0,0]
const directions = [-1, 1, -1, 1, -1]

// react-p5 has this so we can use p5 methods outside of draw, and set up.
  const myp5 = new window.p5()
   //to get access to the fft function in setup, I needed to get the prototype of this instance of P5 constructor, dont ask me why.
  const P5 = Object.getPrototypeOf(myp5).constructor
 

const Visualizer = () => {
  const [audio, setAudio] = useState('')
  
  // function that is passed to the sketch component as a prop
  const setup = (p, canvasParentRef) => {
    p.createCanvas(p.windowWidth, p.windowHeight).parent(canvasParentRef)
    fft = new P5.FFT()
    p.frameRate(120)

    //still not working
    windowResized = () => {
      p.resizeCanvas(p.windowWidth, p.windowHeight);
    }
  
  }


    //function that is passed to the sketch component as a prop
  const draw = (p) => {
    //sets the background color of canvas
    p.background("black")

    //moves canvas to center
    p.translate(p.width/2, p.height/2)
    
    // This is what catches the pitches
  fft.analyze();

  // Get the volumes of different frequency ranges
  const bass    = fft.getEnergy("bass");
  const mid     = fft.getEnergy("mid");     
  const treble  = fft.getEnergy("treble");
  const lowMid = fft.getEnergy("lowMid")
  const highMid = fft.getEnergy("highMid")

  //for rotation speed of diamonds - NEED TO TWEEK THIS
  const trebleSpeed = p.map(treble, 0, 255, 0.3, 5)
  //second slowest
  const lowMidSpeed = p.map(lowMid, 0, 255, 0.3, 1.2)
  const midSpeed = p.map(mid, 0, 255, 0.3, 2.5)
  const highMidSpeed = p.map(highMid, 0, 255, 0.3, 1.5)
  //slowest
  const bassSpeed = p.map(bass, 0, 255, 0.3, 1.2)
  

  const speeds = [trebleSpeed, lowMidSpeed, midSpeed, highMidSpeed, bassSpeed]


  //Whats left?
  //draw watermarks? trail
  // fix colors
  // preset speed adjustments 
  

  // sets the size to the diamonds that are in the treble circle based on volume of treble 
  const sizeTreble = p.map(treble, 0, 255, 15, 45)
  //second heaviest
  const sizeLowMid = p.map(lowMid , 0 , 255, 15, 60)
  const sizeMid = p.map(mid, 0, 255, 15, 30)
  const sizeHighMid = p.map(highMid , 0 , 255, 15, 45)
  //heaviest
  const sizeBass = p.map(bass, 0, 255, 15, 60)

  const sizes = [sizeTreble, sizeLowMid, sizeMid, sizeHighMid, sizeBass]


    class Diamond {
      constructor(x, y, a, size, color, speed) {
        this.pos = p.createVector(x,y)
        this.angle = a
        this.color = color
        this.size = size
        this.speed = speed
      }
  
      //Draws the diamonds
      draw() {
        p.push()
        //sets angle placed on circle, prevents other diamonds from being on top of each other
          p.rotate(this.angle)
        //moves to set position on circle, will be centered in canvas otherwise.
          p.translate(this.pos.x, this.pos.y)
          //current color
          p.fill(this.color)
          //sets the outline of diamonds to black
          p.stroke(0)
          //gives the black outline
          p.strokeWeight(1)
          //draws the diamond shape depending on the size passed when new instance is created.
          p.beginShape();
            p.vertex(0, this.size);
            p.vertex(this.size, 0);
            p.vertex(0, -this.size);
            p.vertex(-this.size, 0);
          p.endShape(p.CLOSE);
        p.pop()
      }
    }


  //sets the circle rings 
  for (let j = 1; j <= numOfCircles; j++){
    let current = j-1
    p.push()
    p.stroke(0)
    p.noFill()
    p.strokeWeight(2)
    p.circle(0,0,radius*(j+1))
    p.pop()

  //polar to cartesian coordinates, basically..this is where our diamond drawing will begin
    const x = (radius * radiusMultiplier[j-1]) * p.cos(angles[j-1]+anglePos[j-1])
    const y = (radius * radiusMultiplier[j-1]) * p.sin(angles[j-1]+anglePos[j-1])

    //for every 2 degrees moved place a diamond 
    for (let a = 0; a < p.radians(12); a+=p.radians(2)) {
      //Makes diamonds instances 
      const diamond = new Diamond(x,y,a, sizes[current], p.color(colors[selectedPalette][current]), speeds[current], directions[current])
      diamond.draw(a)
    }

  //if the diamonds of the current circle being drawn have a direction of one, go one way, else go the other way
  angles[j-1] += directions[current] === 1 ? p.radians(speeds[current]): p.radians(-speeds[current])
  }
}
  //sets the currentSound to the audio
  const preload = () => {
    currentSound = myp5.loadSound(audio)
  }
  
    //any time audio is changed, run preload
  useEffect(() => {
    //if there is a song playing, turn it off before we set the new song
    if(currentSound) {
      if(currentSound.isPlaying() === true) {
        currentSound.stop()
      }
    }
    
    preload()
  },[audio])

     
     swap = () => {
      // if(myp5.keyCode === 65) {
      //   for (let i = 0; i < speeds.length; i++) {
      //     speeds[i] = speeds[i] *= 1.5
      //   }
      // }

      // if(myp5.keyCode === 65) {
      //   for (let i = 0; i < speeds.length; i++) {
      //     speeds[i] = speeds[i] -= 1.5
      //   }
      // }

    //Reverses direction on W key, at the moment
       if(myp5.keyCode === 87) {
        for (let i = 0; i < directions.length; i++) {
          directions[i] *= -1
        }    
       }
       
       // Cycles color palette by pressing enter key
      if (myp5.keyCode === 13) {   
        //if we are on the last palette
        if(selectedPalette === 4)  {
          //reset the cycle
          selectedPalette = 0;
          return
        }          
          selectedPalette++
      }
      return false; // prevent default
  }

  
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
        <Sketch setup={setup} draw={draw} preload={preload} mouseClicked={mouseClicked} windowResized={windowResized} keyPressed={swap}/>
      </div>
      
      <input type="file" name="file" accept="audio/*" onChange={(event) => setAudio(event.target.files[0])}/>
      <button> Play </button>
      {audio ? 'there is audio' : 'we no have that'}
    </div>
    ) 
}

export default Visualizer