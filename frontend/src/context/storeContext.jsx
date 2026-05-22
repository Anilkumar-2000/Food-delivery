import { createContext, useEffect, useState } from 'react';
// import { food_list } from '../assets/assets';
import axios from 'axios';
import { toast } from 'react-hot-toast';
export const StoreContext = createContext(null);

const StoreContextProvider = ({ children }) => {
  const url = 'http://localhost:4000';
  const [cartItems, setCartItems] = useState({});
  const [token, setToken] = useState('' || localStorage.getItem('token'));
  const [food_list, setFoodList] = useState([]);

  const addToCart = async (itemId) => {
    if (!cartItems?.[itemId]) {
      setCartItems((prev) => ({ ...prev, [itemId]: 1 }));
    } else {
      setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
    }

    try {
      if (token) {
        const response = await axios.post(
          `${url}/api/cart/add`,
          { itemId },
          { headers: { token } },
        );

        console.log(response);

        toast.success(response.data.message, { position: 'top-center' });
      }
    } catch (error) {
      toast.error(response.data.message, { position: 'top-center' });
      console.log('Error adding to cart', error.message);
    }
  };

  const removeFromCart = async (itemId) => {
    if (cartItems[itemId] > 0) {
      setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
    }

    try {
      if (token) {
        const response = await axios.post(
          `${url}/api/cart/remove`,
          { itemId },
          { headers: { token } },
        );
        toast.success(response.data.message, { position: 'top-center' });
      }
    } catch (error) {
      toast.error(response.data.message, { position: 'top-center' });
      console.log(error.message);
    }
  };

  const getCartTotalAmount = () => {
    let totalAmount = 0;

    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        const itemInfo = food_list.find((product) => item.toString() === product._id.toString());
        if (itemInfo) {
          totalAmount += itemInfo.price * cartItems[item];
        }
      }
    }

    return totalAmount;
  };

  const loadCartData = async (token) => {
    const response = await axios.post(`${url}/api/cart/get`, {}, { headers: { token } });
    setCartItems(response.data.data);
  };

  const fetchFoodList = async () => {
    const response = await axios.get(`${url}/api/food/list`);
    setFoodList(response.data.data);
  };

  const contextValue = {
    cartItems,
    food_list,
    getCartTotalAmount,
    setCartItems,
    addToCart,
    removeFromCart,
    token,
    setToken,
    url,
  };

  useEffect(() => {
    const loadData = async () => {
      const token = localStorage.getItem('token');
      await fetchFoodList();
      await loadCartData(token);
    };

    loadData();
  }, []);
  return <StoreContext.Provider value={contextValue}>{children}</StoreContext.Provider>;
};

export default StoreContextProvider;
