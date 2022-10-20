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
//to get access to the fft function in setup, I needed to get the prototype of this instance of P5 constructor, dont ask me why.
const P5 = Object.getPrototypeOf(myp5).constructor;

let currentSound;
let fft;

//determines the starting places of the diamonds
let angles = [45, 55, 65, 75, 85];

let radius = 100;
//stretches out distance between diamonds
const radiusMultiplier = [1, 1.5, 2, 2.5, 3];
const numOfDiamondSets = 5;
//if its 1, it will go right, -1 it will go left.
const directions = [-1, 1, -1, 1, -1];
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

const getCurrentSpeed = () => {
  if (selectedSpeed === 0) return 'Slowest';
  if (selectedSpeed === 1) return 'Slower';
  if (selectedSpeed === 2) return 'Normal';
  if (selectedSpeed === 3) return 'Faster';
  if (selectedSpeed === 4) return 'Fastest';
};

const Visualizer = () => {
  const [audio, setAudio] = useState(Animals);
  const [currentSpeed, setCurrentSpeed] = useState(getCurrentSpeed());
  const [currentColorTheme, setCurrentColorTheme] = useState(0);
  const [songStatus, setSongStatus] = useState('Play');

  // function that is passed to the sketch component as a prop
  const setup = (p, canvasParentRef) => {
    p.createCanvas(windowWidth, 800).parent(canvasParentRef);
    fft = new P5.FFT();
    p.frameRate(120);
  };

  //function that is passed to the sketch component as a prop, it also acts as a loop
  const draw = (p) => {
    //each diamond has a position based on x and y coordinates, and angle they are placed set at, and a size, color and speed that can vary.
    class Diamond {
      constructor(x, y, angle, size, color, speed) {
        this.position = p.createVector(x, y);
        this.angle = angle
        this.color = color;
        this.size = size;
        this.speed = speed;
      }

      drawDiamond() {
        p.push();
        //sets angle placed on circle, prevents other diamonds from being on top of each other
        p.rotate(this.angle);
        //moves to set position on circle, will be centered in canvas otherwise.
        p.translate(this.position.x, this.position.y);
        //current color
        p.fill(this.color);
        //sets the outline of diamonds to black
        p.stroke(0);
        //gives the black outline
        p.strokeWeight(1);
        //draws the diamond shape depending on the size passed when new instance was created.
        p.beginShape();
        p.vertex(0, this.size);
        p.vertex(this.size, 0);
        p.vertex(0, -this.size);
        p.vertex(-this.size, 0);
        p.endShape(p.CLOSE);
        
        p.pop();
      }
    }

    //sets the background color of canvas
    p.background('#090909');

    //Tells the user the current speed setting when music is playing
    p.push();
    p.fill('white');
    p.textSize(12);
    p.text('Current Speed Setting', 100, 12);
    p.text(currentSpeed, 100, 40);
    p.pop();

    //Tells the user the current color theme being used
    p.push();
    p.fill('white');
    p.textSize(12);
    p.text('Current Color Theme', windowWidth - 200, 12);
    p.text(paletteThemes[currentColorTheme].label, windowWidth - 200, 40);
    p.pop();

    //moves canvas to center
    p.translate(p.width / 2, p.height / 2);

    // This is what catches the pitches
    fft.analyze();

    // Get the volumes of different frequency ranges
    const treble = fft.getEnergy('treble');
    const lowMid = fft.getEnergy('lowMid');
    const mid = fft.getEnergy('mid');
    const highMid = fft.getEnergy('highMid');
    const bass = fft.getEnergy('bass');

    //for rotation speed of diamonds
    const trebleSpeed = p.map(treble, 0, 255, 0.3, speedSettings[selectedSpeed][0]);
    const lowMidSpeed = p.map(lowMid, 0, 255, 0.3, speedSettings[selectedSpeed][1]);
    const midSpeed = p.map(mid, 0, 255, 0.3, speedSettings[selectedSpeed][2]);
    const highMidSpeed = p.map(highMid, 0, 255, 0.3, speedSettings[selectedSpeed][3]);
    const bassSpeed = p.map(bass, 0, 255, 0.3, speedSettings[selectedSpeed][4]);

  
    //takes the volume of the frequencies and sets them the size of a variable
    const sizeTreble = p.map(treble, 0, 255, 15, 45);
    const sizeLowMid = p.map(lowMid, 0, 255, 15, 60);
    const sizeMid = p.map(mid, 0, 255, 15, 45);
    const sizeHighMid = p.map(highMid, 0, 255, 15, 45);
    const sizeBass = p.map(bass, 0, 255, 15, 60);

    //array of speeds
    const speeds = [trebleSpeed,lowMidSpeed,midSpeed,highMidSpeed,bassSpeed];
    //array of sizes
    const sizes = [sizeTreble, sizeLowMid, sizeMid, sizeHighMid, sizeBass];




    //sets the Diamonds and their movement.
    for (let j = 1; j <= numOfDiamondSets; j++) {
      let current = j - 1;
  
      //polar to cartesian coordinates, basically..this is where our diamond drawing will begin and how it moves around!
      const radiusOfCurrentDiamond = radius * radiusMultiplier[current]
      const angleOfCurrentDiamond = angles[current]
      const x = radiusOfCurrentDiamond * p.cos(angleOfCurrentDiamond);
      const y = radiusOfCurrentDiamond * p.sin(angleOfCurrentDiamond);

      //for every 2 degrees moved place a diamond, this creates the 3D looks
      for (let newAngle = 0; newAngle < p.radians(12); newAngle += p.radians(2)) {

        //Makes diamonds instances
        const currentDiamondColor = paletteThemes[currentColorTheme].colors[current]
        const diamond = new Diamond(x, y, newAngle, sizes[current], p.color(currentDiamondColor), speeds[current], directions[current]);
        //calls the draw method to make the diamonds
        diamond.drawDiamond();
      }

      //if the diamonds of the current circle being drawn have a direction of one, go one way, else go the other way
      angles[current] += directions[current] === 1 ? p.radians(speeds[current]) : p.radians(-speeds[current]);
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
