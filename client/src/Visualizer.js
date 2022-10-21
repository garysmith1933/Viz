import React, { useState, useEffect } from 'react';
import Sketch from 'react-p5';
import 'p5/lib/addons/p5.sound';
import Instructions from './Instructions';
import Box from '@mui/material/Box';
import Animals from './Animals.mp3'
import { paletteThemes } from './colors.js'

//IMPORTANT: Each array has a length of 5, the order is treble, lowmid, mid, highmid, bass

// react-p5 has this so we can use p5 methods outside of draw, and set up.
const myp5 = new window.p5();
//to get access to the fft function in setup, I needed to get the prototype of this instance of P5 constructor
const P5 = Object.getPrototypeOf(myp5).constructor;
let currentSound;
let fft;
let windowWidth = myp5.windowWidth;
let windowHeight = myp5.windowHeight;

const speedSettings = [
  //slowest
  [1.4, 0.6, 0.8, 1, 0.6],
  //slower
  [2, 0.8, 1.4, 1.4, 0.8],
  //normal - this is the default speed before the cycle
  [2.6, 1.0, 2, 1.8, 1.0],
  //faster
  [3.2, 1.2, 2.6, 2.4, 1.2],
  //fastest
  [3.8, 1.4, 3.2, 2.8, 1.4],
];

let selectedSpeed = 2;

//function that returns current speed to be displayed in the sketch
const getCurrentSpeed = () => {
  if (selectedSpeed === 0) return 'Slowest';
  if (selectedSpeed === 1) return 'Slower';
  if (selectedSpeed === 2) return 'Normal';
  if (selectedSpeed === 3) return 'Faster';
  if (selectedSpeed === 4) return 'Fastest';
};

//Used to set direction of each set of diamonds, if its 1, it will go right, -1 it will go left.
const directions = [-1, 1, -1, 1, -1];
 //determines the starting places of the diamonds
let angles = [45, 55, 65, 75, 85];

const Visualizer = () => {
  const [audio, setAudio] = useState(Animals);
  const [currentSpeed, setCurrentSpeed] = useState(getCurrentSpeed());
  const [currentColorTheme, setCurrentColorTheme] = useState(0);
  const [songStatus, setSongStatus] = useState('Play');

  // function that is passed to the sketch component as a prop to draw the canvas
  const setup = (p5, canvasParentRef) => {
    //without this, the entire sketch will not render
    p5.createCanvas(windowWidth, 800).parent(canvasParentRef);
    fft = new P5.FFT();
    p5.frameRate(120);
  };

  //function that is passed to the sketch component as a prop, it also acts as a loop, continously being drawn.
  const draw = (p5) => {
    //each diamond has a position based on cartesian coordinates (x,y), an angle they are placed at, its current size, and its current color
    class Diamond {
      constructor(x, y, angle, size, color) {
        this.position = p5.createVector(x, y);
        this.angle = angle;
        this.size = size;
        this.color = color;
      }

      drawDiamond() {
        p5.push();
        //sets angle prevents other diamonds from being on top of each other
        p5.rotate(this.angle);
        //moves to position based on cartesian coordinate
        p5.translate(this.position.x, this.position.y);
        //gives the diamond its color
        p5.fill(this.color);
        //sets the outline of diamonds to black
        p5.stroke(0);

        //draws the diamond shape depending on the size passed when new instance was created.
        p5.beginShape();
        p5.vertex(0, this.size);
        p5.vertex(this.size, 0);
        p5.vertex(0, -this.size);
        p5.vertex(-this.size, 0);
        p5.endShape(p5.CLOSE);

        p5.pop();
      }
    }

    //sets the background color of canvas
    p5.background('#090909');

    //Tells the user the current speed setting when music is playing
    p5.push();
    p5.fill('white');
    p5.textSize(12);
    p5.text('Current Speed Setting', 100, 12);
    p5.text(currentSpeed, 100, 40);
    p5.pop();

    //Tells the user the current color theme being used
    p5.push();
    p5.fill('white');
    p5.textSize(12);
    p5.text('Current Color Theme', windowWidth - 200, 12);
    p5.text(paletteThemes[currentColorTheme].label, windowWidth - 200, 40);
    p5.pop();

    //moves canvas to center
    p5.translate(p5.width / 2, p5.height / 2);

    // This is what catches the pitches
    fft.analyze();

    // Get the volumes of different frequency ranges
    const treble = fft.getEnergy('treble');
    const lowMid = fft.getEnergy('lowMid');
    const mid = fft.getEnergy('mid');
    const highMid = fft.getEnergy('highMid');
    const bass = fft.getEnergy('bass');

    //for rotation speed of diamonds
    const trebleSpeed = p5.map(treble, 0, 255, 0.3, speedSettings[selectedSpeed][0]);
    const lowMidSpeed = p5.map(lowMid, 0, 255, 0.3, speedSettings[selectedSpeed][1]);
    const midSpeed = p5.map(mid, 0, 255, 0.3, speedSettings[selectedSpeed][2]);
    const highMidSpeed = p5.map(highMid, 0, 255, 0.3, speedSettings[selectedSpeed][3]);
    const bassSpeed = p5.map(bass, 0, 255, 0.3, speedSettings[selectedSpeed][4]);

    //array of speeds
    const currentSpeeds = [trebleSpeed,lowMidSpeed,midSpeed,highMidSpeed,bassSpeed];

    //takes the volume of the frequencies and sets them the size of a variable
    const sizeTreble = p5.map(treble, 0, 255, 15, 45);
    const sizeLowMid = p5.map(lowMid, 0, 255, 15, 60);
    const sizeMid = p5.map(mid, 0, 255, 15, 45);
    const sizeHighMid = p5.map(highMid, 0, 255, 15, 45);
    const sizeBass = p5.map(bass, 0, 255, 15, 60);

    //array of sizes
    const sizes = [sizeTreble, sizeLowMid, sizeMid, sizeHighMid, sizeBass];

    const numOfDiamondSets = 5;
    //sets the Diamonds and their movement.
    for (let j = 1; j <= numOfDiamondSets; j++) {
      let current = j - 1;
    
      //stretches out distance between diamonds, if they were all the same they will overlap each other
      const radiusOfDiamonds = [100, 150, 200, 250, 300]
      
      //polar to cartesian coordinates, basically..this is where our diamond drawing will begin and how it moves around!
      const radiusOfCurrentDiamond = radiusOfDiamonds[current]
      const angleOfCurrentDiamond = angles[current]
      const x = radiusOfCurrentDiamond * p5.cos(angleOfCurrentDiamond);
      const y = radiusOfCurrentDiamond * p5.sin(angleOfCurrentDiamond);

      //for every 2 degrees moved place a diamond, this creates the 3D look of each of the diamonds
      for (let rotateAngle = 0; rotateAngle < p5.radians(12); rotateAngle += p5.radians(2)) {
        const currentDiamondColor = paletteThemes[currentColorTheme].colors[current]
        const diamond = new Diamond(x, y, rotateAngle, sizes[current], p5.color(currentDiamondColor));
        //calls the draw method to make the diamonds
        diamond.drawDiamond();
      }

      //this is what causes the diamonds to move. Since we know its either 1 or -1
      angles[current] += directions[current] === 1 ? p5.radians(currentSpeeds[current]) : p5.radians(-currentSpeeds[current]);
    }
  };

  //sets the currentSound to the audio
  const preload = () => {
    currentSound = myp5.loadSound(audio)
    currentSound.setVolume(0.2)
  };

  //any time audio is changed, run preload
  useEffect(() => {
    //if there is a song playing, turn it off before we set the new song
    if (currentSound) {
      if (currentSound.isPlaying() === true) {
        currentSound.stop();
      }
    }
    preload();
  }, [audio]);

  //makes the background completely black and removes it when we leave the page
  useEffect(() => {
    document.body.classList.add('bg-black');

    return () => {
      document.body.classList.remove('bg-black');
    };
  }, []);

  const keyPresses = () => {
    // adds speed, press a
    if (myp5.keyCode === 65) {
      //if you are at the max speed, chill out!
      if (selectedSpeed === 4) return;
      selectedSpeed++;
      setCurrentSpeed(getCurrentSpeed());
    }

    //decreases speed, press s
    if (myp5.keyCode === 83) {
      //if you are at the bottom and its still too much...I suck at adjusting speed lol
      if (selectedSpeed === 0) return;
      selectedSpeed--;
      setCurrentSpeed(getCurrentSpeed());
    }

    //Reverses direction on W key, at the moment
    if (myp5.keyCode === 87) {
      for (let i = 0; i < directions.length; i++) {
        directions[i] *= -1;
      }
    }

    // Cycles color palette by pressing enter key
    if (myp5.keyCode === 13) {
      //if we are on the last palette
      if (currentColorTheme === 9) {
        //reset the cycle
        setCurrentColorTheme(0);
        return;
      }
      setCurrentColorTheme(currentColorTheme + 1);
    }
    return false;
  };

  //if the window was set one way, this will readjust the drawing when it is changed.
  const windowResized = () => {
    myp5.resizeCanvas(windowWidth, windowHeight);
  };

  //Pause / Play feature. Needs to be troubleshooted on chrome, but works perfectly on firefox 
  const mouseClicked = () => {
    if (currentSound.isPlaying()) {
      if (currentSound) {
        currentSound.pause();
        setSongStatus('Paused')
      }
    } else {
      currentSound.play();
      setSongStatus('Playing')
    }
  };

  return (
    <>
      <Box sx={{display: 'flex',justifyContent: 'center', width: '100%',}}>
        <Instructions />
      </Box>

      <Sketch setup={setup} draw={draw} preload={preload} windowResized={windowResized} keyPressed={keyPresses}/>
   
      <div className='button-container'>
        <label id='music-upload-button'>
          <input id='musicInput' type='file' name='file' accept='audio/*' onChange={(event) => setAudio(event.target.files[0])}/>
          Upload a track
        </label>

        <div id='play-button' onClick={mouseClicked}>
            {songStatus}
        </div>
      </div>
    </>
  );
};

export default Visualizer;
