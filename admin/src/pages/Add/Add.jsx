import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Add.css';
import { assets } from '../../assets/assets';
import { toast } from 'react-hot-toast';

const Add = () => {
  const [image, setImage] = useState(false);
  const url = 'http://localhost:4000';

  const [data, setData] = useState({
    name: '',
    description: '',
    price: '',
    category: 'Salad',
  });

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    setData((prev) => ({ ...prev, [name]: value }));
  };

  const formSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();

    formData.append('name', data.name);
    formData.append('description', data.description);
    formData.append('category', data.category);
    formData.append('price', Number(data.price));
    formData.append('image', image);

    console.log([...formData.entries()]);

    const response = await axios.post(`${url}/api/food/add`, formData);

    if (response.data.success) {
      setData({
        name: '',
        description: '',
        price: '',
        category: 'Salad',
      });
      setImage(false);
      toast.success(response.data.message);

      console.log(error.message);
      toast(response.error.message);
    } else {
      console.log(response.data);
    }
  };

  return (
    <div className="add">
      <form className="flex-col" onSubmit={formSubmit}>
        <div className="add-image-upload flex-col">
          <p>Upload</p>
          <label htmlFor="image">
            <img
              src={image ? URL.createObjectURL(image) : assets.upload_area}
              className="uploaded-image"
            />
          </label>
          <input
            type="file"
            className="image-upload-area"
            id="image"
            hidden
            name="image"
            onChange={(event) => {
              setImage(event.target.files[0]);
            }}
            required
          />
        </div>
        <div className="add-product-name flex-col">
          <p>Product name</p>
          <input
            type="text"
            name="name"
            placeholder="Name"
            className="input-element"
            onChange={onChangeHandler}
            value={data.name}
            required
          />
        </div>
        <div className="add-product-name flex-col">
          <p>Product description</p>
          <textarea
            name=""
            rows="6"
            className="input-element"
            placeholder="Write content"
            onChange={onChangeHandler}
            name="description"
            value={data.description}
            required
          ></textarea>
        </div>
        <div className="add-category-price">
          <div className="add-category flex-col">
            <p>Category</p>
            <select
              className="input-element"
              value={data.category}
              name="category"
              onChange={onChangeHandler}
              required
            >
              <option value="Salad">Salad</option>
              <option value="Rolls">Rolls</option>
              <option value="Deserts">Deserts</option>
              <option value="Sandwich">Sandwich</option>
              <option value="Cake">Cake</option>
              <option value="Pure Veg">Pure Veg</option>
              <option value="Pasta">Pasta</option>
              <option value="Noodles">Noodles</option>
            </select>
          </div>
          <div className="add-price flex-col">
            <p>Product price</p>
            <input
              type="Number"
              placeholder="$20"
              name="price"
              className="input-element"
              onChange={onChangeHandler}
              value={data.price}
              required
            />
          </div>
        </div>
        <button className="add-button" type="submit">
          Add
        </button>
      </form>
    </div>
  );
};

export default Add;
