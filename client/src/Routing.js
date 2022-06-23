import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Upload from './Upload/Upload';
import Visualizer from './Visualizer';
import Login from './components/Auth/AuthForm';
import { useSelector } from 'react-redux';

import Playlist from './components/SavedSong';
import Logout from './components/Logout';

//import { useSelector } from 'react-redux';

const Routing = () => {
  //const user = useSelector((state) => state.auth);
  const auth = useSelector((state) => state.authorizeReducer.auth);

  return (
    <>
      {auth.id ? (
        <Routes>
          {/* <Route exact path='/:id'>
            <Redirect to='/visualizer' />
          </Route> */}
          {/* <Route path='/:id' element={<Visualizer />} /> */}
          <Route path='/:id' element={<Navigate replace to='/visualizer' />} />
          <Route path='/Upload' element={<Upload />} />
          <Route path='/Logout' element={<Logout />} />
          <Route path='/playlist' element={<Playlist />} />
          <Route path='/visualizer' element={<Visualizer />} />
        </Routes>
      ) : (
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/Logout' element={<Login />} />
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
