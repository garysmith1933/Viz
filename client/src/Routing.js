import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Visualizer from './Visualizer';

const Routing = () => {
  return (
    <Routes>
      <Route path='/' element={<Visualizer />} />
    </Routes>
  );
};

export default Routing;
