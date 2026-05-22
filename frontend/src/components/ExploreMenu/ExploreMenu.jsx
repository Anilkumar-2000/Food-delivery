import React from 'react';
import './ExploreMenu.css';

import { menu_list } from '../../assets/assets';

const ExploreMenu = ({ category, setCategory }) => {
  console.log(category);

  return (
    <div className="explore-menu" id="menu">
      <h2 className="explore-menu-title">Explore Our Menu</h2>
      <p className="explore-menu-description">
        Choose from a diverse menu featuring a delectable array of dishes. Our mission is to satisfy
        your cravings and elevate your dining experience, one delicious meal at a time.
      </p>

      <div className="explore-menu-items">
        {menu_list.map((item, index) => (
          <div
            key={index}
            onClick={() =>
              setCategory((prev) => (prev === item.menu_name ? 'All' : item.menu_name))
            }
            className="explore-menu-card"
          >
            <img
              className={category === item.menu_name ? 'active-menu-category' : ''}
              src={item.menu_image}
            />
            <p>{item.menu_name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExploreMenu;
