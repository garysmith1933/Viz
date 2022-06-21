import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Upload from './Upload/Upload';
import Visualizer from './Visualizer';
import SpotifyLogin from './Spotify';


import Login from './components/Auth/AuthForm';
import { useSelector } from 'react-redux';

import Playlist from './components/SavedSong'


//import { useSelector } from 'react-redux';

const Routing = () => {
  //const user = useSelector((state) => state.auth);
  const auth = useSelector((state) => state.authorizeReducer.auth);

  return (
    <>
      {auth.id ? (
        <Routes>
          <Route path='/:id' element={<Visualizer />} />
          <Route path='/Upload' element={<Upload />} />
          <Route path='/spotify' element={<SpotifyLogin />} />
          <Route path='/playlist' element={<Playlist />} />
        </Routes>
      ) : (
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/:id' element={<Login />} />
        </Routes>
      )}
    </>
  );
};

export default Routing;
{
  /* <>
      {auth.id ? (
        <Routes>
          <Route path='/' element={<Visualizer />} />
          <Route path='/Upload' element={<Upload />} />
          <Route path='/spotify' element={<SpotifyLogin />} />
          <Route path='/playlist' element={<Playlist />} />
        </Routes>
      ) : (
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/:id' element={<Login />} />
        </Routes>
      )}
    </> */
}
