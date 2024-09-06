// ParentComponent.js
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "./action";

const ParentComponent = () => {
  const dispatch = useDispatch();
  const { dataA, loading, error } = useSelector((state) => state.dataA);
  console.log(dataA);
  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <h1>Products List</h1>
      <ul>
        {dataA.map((product) => (
          <li key={product._id}>
            <strong>{product.productsName}</strong> - {product.price} -{" "}
            {product.category}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ParentComponent;

// ChildComponentA.js

// ChildComponentB.js
