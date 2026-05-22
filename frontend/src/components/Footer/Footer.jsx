import React, { useState } from 'react';

import './Footer.css';
import { assets } from '../../assets/assets';

const Footer = () => {
  const [footerLink, setFooterLinks] = useState('home');

  return (
    <div className="footer" id="contact">
      <div className="footer-info-cont">
        <div className="footer-left">
          <img src={assets.logo} />
          <p>
            {' '}
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus numquam totam quas
            velit pariatur quis debitis nam aliquam adipisci consequuntur!
          </p>
          <div className="footer-social-img">
            <img src={assets.facebook_icon} alt="" />
            <img src={assets.twitter_icon} alt="" />
            <img src={assets.linkedin_icon} alt="" />
          </div>
        </div>
        <div className="footer-center">
          <h2>COMPANY</h2>
          <p>Home</p>
          <a>About Us</a>
          <p>Delivery</p>
          <p>Privacy policy</p>
        </div>
        <div className="footer-right">
          <h2>GET IN TOUCH</h2>
          <p>+212-45670</p>
          <p>contact@Tomato.com</p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
