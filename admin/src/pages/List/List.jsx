import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './List.css';
import { toast } from 'react-hot-toast';

const List = ({url}) => {
 
  const [list, setList] = useState([]);

  const fetchList = async () => {
    const response = await axios.get(`${url}/api/food/list`);

    if (response.data.success) {
      setList(response.data.data);
      toast.success(response.data.message);
    } else {
      toast.error(response.data.error);
    }
  };

  const removeFood = async (foodId) => {
    const response = await axios.post(`${url}/api/food/remove/${foodId}`);
    await fetchList();
    if (response.data.success) {
      toast.success(response.data.message);
    } else {
      toast.error(response.error.message);
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

  console.log(list);
  return (
    <div className="list add">
      <div>All Foods List</div>
      <div className="list-table-format title">
        <b>Image</b>
        <b>Name</b>
        <b>Category</b>
        <b>Price</b>
        <b>Action</b>
      </div>

      {list.map((item, index) => (
        <div className="list-table-format flex-col" key={index}>
          <img className="list-uploaded-image" src={`${url}/images/` + item.image} />
          <p>{item.name}</p>
          <p>{item.category}</p>
          <p>${item.price}</p>
          <p className="cursor" onClick={() => removeFood(item._id)}>
            X
          </p>
        </div>
      ))}
    </div>
  );
};

export default List;
