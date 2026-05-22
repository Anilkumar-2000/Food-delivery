import React, { useState } from 'react';
import { Routes, Route, useSearchParams } from 'react-router-dom';
import Home from './pages/Home/Home';
import Cart from './pages/Cart/Cart';
import PlaceOrder from './pages/PlaceOrder/PlaceOrder';
import Navbar from './components/Navbar/Navbar.jsx';
import Footer from './components/Footer/Footer.jsx';

import './App.css';
import LoginPopup from './components/LoginPopup/LoginPopup.jsx';
import { Toaster } from 'react-hot-toast';
import Verify from './pages/Verify/Verify.jsx';
import MyOrders from './pages/MyOrders/MyOrders.jsx';
const App = () => {
  const [showLoginPopup, setShowLoginPopup] = useState(false);

  return (
    <>
      {showLoginPopup && (
        <LoginPopup showLoginPopup={showLoginPopup} setShowLoginPopup={setShowLoginPopup} />
      )}
      <div className="app-container">
        <Navbar setShowLoginPopup={setShowLoginPopup} />
        <Routes>
          <Route path="/" element={<Home setShowLoginPopup={setShowLoginPopup} />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/order" element={<PlaceOrder />} />
          <Route path="/verify" element={<Verify />} />
          <Route path="/myorders" element={<MyOrders />} />
        </Routes>
      </div>
      <Footer />
      <Toaster />
    </>
  );
};

export default App;
