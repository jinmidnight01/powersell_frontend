import React from 'react';
import { Route, Routes } from 'react-router-dom';
import LandingPage from './pages/LandingPage/LandingPage';
import './App.css';
import DetailProductPage from './pages/DetailProductPage/DetailProductPage';
import AuthenticationPage from './pages/OrderConfirmPage/AuthenticationPage';
import OrderConfirmPage from './pages/OrderConfirmPage/OrderConfirmPage';
import OrderSuccessPage from './pages/OrderSuccessPage/OrderSuccessPage';
import AdminPage from './pages/AdminPage/AdminPage';
import OrderFailPage from './pages/OrderFailPage/OrderFailPage';

function App() {
  return (
    <Routes>
      <Route path='/' element={<LandingPage />} />
      <Route path='/product/:productId' element={<DetailProductPage />} />
      <Route path='/ordersuccess' element={<OrderSuccessPage/>} />
      <Route path='/orderfail' element={<OrderFailPage/>} />
      <Route path='/authentication' element={<AuthenticationPage />} />
      <Route path='/orderconfirm' element={<OrderConfirmPage />} />
      <Route path='/admin/*' element={<AdminPage />} />
    </Routes>
  );
}

export default App;
