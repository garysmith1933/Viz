import * as React from 'react'
import { Canvas } from "@react-three/fiber";
import styled from "styled-components";
import { OrbitControls} from "@react-three/drei";
import Phonograph from './components/Phonograph'
import '@fontsource/roboto/700.css';
import { Typography,Box } from '@mui/material';

import ArrowCircleDownIcon from '@mui/icons-material/ArrowCircleDown';
import { Link } from 'react-router-dom';
//set up 1.scene 2.Camera 3.Renderer

const Wrapper = styled.div`
  position: relative;
  background: #000000;

  canvas {
    height: 800px;
  };

  
`;
const LandingPage = ()=>{
    return(
        <Wrapper className="wrapper">
            <Box sx={{
              display:'flex',
              flexDirection:'column',
              justifyContent:'center',
              marginLeft:'20%',
              marginRight:'20%',
              alignItems:'center'
            }}>
              <Typography variant="h1" sx={{
                color: "white",
                fontFamily:'Playfair Display',
                fontStyle:'italic',
                marginTop:'2rem'
              }}>
                Welcome to our cool audio visualizer
              </Typography>;
              <Typography variant="h4" sx={{
                color: "white",
                fontFamily:'Chivo',
                mx:'10%'
              }}>
                By using this audio visualizer, you can enjoy the music with cool visualization. You can also save your song for furture access.
              </Typography>;
            </Box>

            <Link to='/player'>
              <Box sx={{
                display:'flex',
                flexDirection:'row',
                justifyContent:'center',
                marginTop:'1rem'
              }}>
                <ArrowCircleDownIcon sx={{ fontSize: 40, mr: 1,color: "white" }} />
                <Typography variant="h4" sx={{
                  color: "white",
                  fontFamily:'Chivo',
                }}>
                  Click here to start
                </Typography>;
              </Box>
            </Link>
            <Canvas className='canvas'>
                <OrbitControls enableZoom={false}/>
                <ambientLight intensity={0.5} />
                <directionalLight position={[-5,6,6]} intensity={50} />
                <React.Suspense fallback={null}>
                  <Phonograph />
                </React.Suspense>
            </Canvas>
        </Wrapper>
    )
}
export default LandingPage