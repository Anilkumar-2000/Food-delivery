import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import './LoginPopup.css';
import { assets } from '../../assets/assets';
import { toast } from 'react-hot-toast';

import { StoreContext } from '../../context/storeContext';

const LoginPopup = ({ setShowLoginPopup }) => {
  const { setToken, token } = useContext(StoreContext);

  const url = 'http://localhost:4000';
  const [currState, setCurrState] = useState('login');

  const [data, setData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    setData((data) => ({ ...data, [name]: value }));
  };

  const onSubmitForm = async (event) => {
    event.preventDefault();

    let newUrl = url;

    if (currState === 'sign-up') {
      newUrl = newUrl + '/api/user/register';
    } else {
      newUrl = newUrl + '/api/user/login';
    }

    const response = await axios.post(newUrl, data);

    if (response.data.success) {
      setData({
        name: '',
        email: '',
        password: '',
      });
      toast.success(response.data.message);
      localStorage.setItem('token', response.data.token);
      setToken(response.data.token);
      setShowLoginPopup(false);
    }
  };

  useEffect(() => {
    // 🔒 Lock background scroll
    document.body.style.overflow = 'hidden';

    return () => {
      // 🔓 Restore scroll when modal unmounts
      document.body.style.overflow = 'auto';
    };
  }, []);

  return (
    <div className="login-popup">
      <div className="login-popup-parent">
        <form className="login-form" onSubmit={onSubmitForm}>
          <div className="login-popup-heading-and-cross-icon">
            <h2>{currState === 'login' ? 'Login' : 'Sign up'}</h2>
            <img src={assets.cross_icon} onClick={() => setShowLoginPopup(false)} />
          </div>
          <div className="login-popup-input-cont">
            {currState !== 'login' && (
              <input
                type="text"
                className="login-input"
                placeholder="Name"
                name="name"
                value={data.name}
                onChange={onChangeHandler}
                required
              />
            )}
            <input
              type="email"
              className="login-input"
              placeholder="Email"
              name="email"
              value={data.email}
              onChange={onChangeHandler}
              required
            />
            <input
              type="password"
              className="login-input"
              placeholder="Password"
              name="password"
              value={data.password}
              onChange={onChangeHandler}
              required
            />
            <button className="login-popup-button" type="submit">
              {currState === 'sign-up' ? 'Register' : 'Login'}
            </button>
          </div>
          <div className="login-popup-conditions">
            <input type="checkbox" />
            <p>By continuing,i agree to the terms of use & privacy policy.</p>
          </div>
          {currState === 'login' ? (
            <p>
              Create new account <span onClick={() => setCurrState('sign-up')}>Click here</span>
            </p>
          ) : (
            <p>
              Already have account{' '}
              <span onClick={() => setCurrState('login')}>Login here</span>{' '}
            </p>
          )}
        </form>
      </div>
    </div>
  );
};

export default LoginPopup;
