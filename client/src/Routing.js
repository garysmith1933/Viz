import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Upload from './Upload/Upload';
import Visualizer from './Visualizer';
import SpotifyLogin from './Spotify';
import Instructions from './Instructions';
//import { useSelector } from 'react-redux';

const Routing = () => {
  //const user = useSelector((state) => state.auth);
  return (
    <Routes>
      <Route path='/' element={<Visualizer />} />
      <Route path='/Upload' element={<Upload />} />
      <Route path='/spotify' element={<SpotifyLogin/>}/>
      <Route path='/instructions' element={<Instructions/>}/>
    </Routes>
  );
};

export default Routing;
