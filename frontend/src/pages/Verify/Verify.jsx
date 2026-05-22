import React from 'react';
import './Verify.css';
import axios from 'axios';
import { useSearchParams } from 'react-router-dom';
import { useContext } from 'react';
import { StoreContext } from '../../context/storeContext';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const Verify = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { url } = useContext(StoreContext);
  const success = searchParams.get('success');
  const orderId = searchParams.get('orderId');

  const navigate = useNavigate();

  const verifyOrder = async () => {
    const response = await axios.post(`${url}/api/order/verify`, { success, orderId });
    console.log('from verify', response);
    if (response.data.success) {
      navigate('/myorders');
    } else {
      navigate('/');
    }
  };

  useEffect(() => {
    verifyOrder();
  }, []);

  return (
    <div className="verify">
      <div className="spinner"></div>
    </div>
  );
};

export default Verify;
