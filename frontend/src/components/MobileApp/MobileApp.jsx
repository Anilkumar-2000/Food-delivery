import React from 'react';

import { assets } from '../../assets/assets';

import './MobileApp.css';

const MobileApp = () => {
  return (
    <div className="mobile-app" id="mobile-app">
      <h2>For Better Experience Download Tomota App</h2>
      <div className="mobile-app-img-container">
        <img className="play-store-img" src={assets.play_store} />
        <img className="app-store-img" src={assets.app_store} />
      </div>
    </div>
  );
};

export default MobileApp;
