import './Navbar.css';

import { assets } from '../../assets/assets';
import { useContext, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { StoreContext } from '../../context/storeContext';

const Navbar = ({ setShowLoginPopup }) => {
  const [navMenu, setNavMenu] = useState('home');
  const { getCartTotalAmount, token, setToken } = useContext(StoreContext);

  const naviagte = useNavigate();

  const logout = () => {
    localStorage.removeItem('token');
    setToken('');
  };

  return (
    <div className="navbar">
      <NavLink to="/">
        <div className="navbar-logo">
          <img src={assets.logo} className="navbar-logo" />
        </div>
      </NavLink>
      <ul className="navbar-menu">
        <a
          onClick={() => setNavMenu('home')}
          className={navMenu === 'home' ? 'active-menu' : ''}
          href="#home"
        >
          Home
        </a>
        <a
          onClick={() => setNavMenu('menu')}
          className={navMenu === 'menu' ? 'active-menu' : ''}
          href="#menu"
        >
          Menu
        </a>
        <a
          onClick={() => setNavMenu('mobile-app')}
          className={navMenu === 'mobile-app' ? 'active-menu' : ''}
          href="#mobile-app"
        >
          Mobile Apps
        </a>
        <a
          onClick={() => setNavMenu('contact')}
          className={navMenu === 'contact' ? 'active-menu' : ''}
          href="#contact"
        >
          Contact us
        </a>
      </ul>
      <div className="navbar-search-icon">
        <img src={assets.search_icon} />
        <NavLink to="/cart">
          <div className="navbar-basket-icons">
            <img src={assets.basket_icon} />
            <div className={getCartTotalAmount() && 'dot'}></div>
          </div>
        </NavLink>
        {token ? (
          <div className="nav-profile">
            <img src={assets.profile_icon} />
            <ul className="nav-profile-dropdown">
              <li onClick={() => naviagte('/myorders')}>
                <img src={assets.bag_icon} />
                <p>Orders</p>
              </li>
              <hr />
              <li onClick={logout}>
                <img src={assets.logout_icon} />
                <p>Logout</p>
              </li>
            </ul>
          </div>
        ) : (
          <button className="login-btn" onClick={() => setShowLoginPopup(true)}>
            Login
          </button>
        )}
      </div>
    </div>
  );
};

export default Navbar;
