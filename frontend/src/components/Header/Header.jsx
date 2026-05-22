import React from 'react';
import './Header.css';

const Header = () => {
  return (
    <div className="header" id="#">
      <div className="header-text-content">
        <h2>Order Your Favourite food Here</h2>
        <p>
          {' '}
          Choose from a diverse menu featuring a delectable array of dishes crafted with the finest
          ingredients and culinary expertise. Our mission is to satisfy your cravings and elevate
          your dining experience, one delicious meal at a time.
        </p>
        <a href="#menu" className="view-menu-button">
          View menu
        </a>
      </div>
    </div>
  );
};

export default Header;
