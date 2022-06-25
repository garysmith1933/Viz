
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Upload from './Upload/Upload';
import Visualizer from './Visualizer';
import Login from './components/Auth/AuthForm';
import { useSelector } from 'react-redux';
import Playlist from './components/SavedSong';
import Logout from './components/Logout';

const Routing = () => {
  const auth = useSelector((state) => state.authorizeReducer.auth);

  return (
    <>
      {auth.id ? (
        <Routes>
          <Route path='/' element={<Visualizer/>} />
          <Route path='/Upload' element={<Upload />} />
          <Route path='/Logout' element={<Logout />} />
          <Route path='/playlist' element={<Playlist />} />
        </Routes>
      ) : (
        <Routes>
          <Route path='/' element={<Visualizer />} />
          {/* <Route path='/Logout' element={<Login />} /> */}
          <Route path='/Logout' element={<Navigate replace to='/' />} />
          <Route path='/:id' element={<Login />} />
        </Routes>
      )}
    </>
  );
};

export default Routing;