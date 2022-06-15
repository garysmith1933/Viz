import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Upload from './Upload/Upload';
import Visualizer from './Visualizer';
import SpotifyLogin from './Spotify';
//import { useSelector } from 'react-redux';

//currently if I wanted to get to the spotify page I would have to login again, is this by design or a bug ? - GS

const Routing = () => {
  //const user = useSelector((state) => state.auth);
  return (
    <Routes>
      <Route path='/' element={<Visualizer />} />
      <Route path='/Upload' element={<Upload />} />
      <Route path='/spotify' element={<SpotifyLogin/>}/>
    </Routes>
  );
};

export default Routing;
