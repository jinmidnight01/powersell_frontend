import React from 'react';
import { Route, Routes } from 'react-router-dom';
import LandingPage from './pages/LandingPage/LandingPage';
import './App.css';
import DetailProductPage from './pages/DetailProductPage/DetailProductPage';

function App() {
  return (
    <Routes>
      <Route path='/' element={<LandingPage />} />
      <Route path='/product/:productId' element={<DetailProductPage />} />
    </Routes>
  );
}

export default App;
