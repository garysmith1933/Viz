import React, { useState, useEffect } from 'react'
import Sketch from 'react-p5';
import 'p5/lib/addons/p5.sound';

//I was playing around with the look of the visualizer. Feel free to mess around with this yourselves. 

let currentSound;
let fft;
let angle = 0
let angles = [0, 0, 0, 0, 0]
//An array of colors to pick from. - Will set up later
const colors = ["#FFA500","pink",'purple', 'red', 'green']
   
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
  const bassSpeed = p.map(bass, 0, 255, 0.3, 1.3)
  const midSpeed = p.map(mid, 0, 255, 0.3, 1.8)
  const trebleSpeed = p.map(treble, 0, 255, 0.3, 3)
  const lowMidSpeed = p.map(lowMid, 0, 255, 0.3, 1.3 )
  const highMidSpeed = p.map(highMid, 0, 255, 0.3, 1.8)

  const speeds = [trebleSpeed, lowMidSpeed, midSpeed, highMidSpeed, bassSpeed]


  //LOOK HERE
  //things I need to look into tomorrow
  //Setting the size for the other two sets of triangles to compensate gap - COMPLETE
  //color palletes
  //rotation reverse - COMPLETE
  //draw watermarks?
  

  // sets the size to the diamonds that are in the treble circle based on volume of treble 
  const sizeTreble = p.map(treble, 0, 255, 15, 45)
  const sizeLowMid = p.map(lowMid , 0 , 255, 15, 60)
  const sizeMid = p.map(mid, 0, 255, 15, 30)
  const sizeHighMid = p.map(highMid , 0 , 255, 15, 45)
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
  p.push()
  p.stroke(0)
  p.noFill()
  p.strokeWeight(2)
  p.circle(0,0,radius*(j+1))
  p.pop()

//Makes diamonds instances 
  // console.log(radiusMultiplier[j])
  const x = (radius * radiusMultiplier[j-1]) * p.cos(angles[j-1]+anglePos[j-1])
  const y = (radius * radiusMultiplier[j-1]) * p.sin(angles[j-1]+anglePos[j-1])

  
//This makes 
  for (let a = 0; a < p.radians(12); a+=p.radians(2)) {
    const diamond = new Diamond(x,y,a, sizes[j-1], p.color([colors[j-1]]), speeds[j-1], directions[j-1])
    diamond.draw(a)
  }


//if the drop is hard enough, LETS REVERSE IT!
  if(bass > 250 && lowMid > 225) {
    console.log('reversing')
    directions[j-1] *= -1
  }


// //set an array of angles, that we can adjust from here to set the direction of each one
angles[j-1] += directions[j-1] === 1 ? p.radians(speeds[j-1]): p.radians(-speeds[j-1])
}
}

  

  //sets the currentSound to the audio
  const preload = () => {
    currentSound = myp5.loadSound(audio)
  }
  
    //any time audio is changed, run preload
  useEffect(() => {
    if(currentSound) {
      if(currentSound.isPlaying() === true) {
        currentSound.stop()
      }
    }
    
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