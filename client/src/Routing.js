import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Upload from './Upload/Upload';
import Visualizer from './Visualizer';

const Routing = () => {
  return (
    <Routes>
      <Route path='/' element={<Visualizer />} />
      <Route path='/upload' element={<Upload />} />
    </Routes>
  );
};

export default Routing;
