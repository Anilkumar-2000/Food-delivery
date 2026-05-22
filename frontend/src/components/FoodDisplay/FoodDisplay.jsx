import React from 'react';
import FoodItem from '../../components/FoodItem/FoodItem';

import './FoodDisplay.css';
import { useContext } from 'react';
import { StoreContext } from '../../context/storeContext';

const FoodDisplay = ({ category }) => {
  const { food_list } = useContext(StoreContext);

  return (
    <div className="food-display">
      <h2 className="food-display-heading">Top dishes Near you</h2>
      <div className="food-items-list-container">
        {food_list.map((item, index) => {
          if (category === item.category || category === 'All')
            return (
              <FoodItem
                key={index}
                id={item._id}
                name={item.name}
                image={item.image}
                price={item.price}
                category={item.category}
                description={item.description}
              />
            );
        })}
      </div>
    </div>
  );
};

export default FoodDisplay;
