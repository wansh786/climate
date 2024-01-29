import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Login from './Login';
import DisplayWeather from './DisplayWeather';
import { Home } from './Home';

const AllRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/login' element={<Login />} />
      <Route path='/weather' element={<DisplayWeather />} />
    </Routes>
  );
};

export default AllRoutes;
