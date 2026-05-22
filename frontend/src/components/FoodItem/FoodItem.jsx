import React from 'react';
import { assets } from '../../assets/assets';

import { useContext } from 'react';
import { StoreContext } from '../../context/storeContext';
import './FoodItem.css';

const FoodItem = ({ name, image, price, category, description, id }) => {
  const { cartItems, addToCart, removeFromCart, token, url } = useContext(StoreContext);

  return (
    <div className="food-item">
      <div className="food-item-img-container">
        <img className="food-item-image" src={url + '/images/' + image} />
        <div className="food-item-info">
          <div className="food-item-add-remove-icon">
            {!cartItems?.[id] ? (
              <img onClick={() => addToCart(id)} src={assets.add_icon_white} />
            ) : (
              <div className="add-remove-container">
                <img src={assets.remove_icon_red} onClick={() => removeFromCart(id)} />
                <p>{cartItems[id]}</p>
                <img src={assets.add_icon_green} onClick={() => addToCart(id)} />
              </div>
            )}
          </div>
          <div className="food-item-name-image-cont">
            <p className="food-item-name">{name}</p>
            <img src={assets.rating_starts} />
          </div>
          <p>{description}</p>
          <p className="food-item-price">${price}</p>
        </div>
      </div>
    </div>
  );
};

export default FoodItem;
