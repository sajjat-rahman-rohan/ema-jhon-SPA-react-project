import React, { useEffect, useState } from "react";
import Product from "../Product/Product";
import "./Shop.css";

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);

  const handleAddTocart = (product) => {
    // console.log(product);
    const newCart = [...cart, product];
    setCart(newCart);
  };

  useEffect(() => {
    fetch("../../../public/products.json")
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);
  return (
    <div className="shop-container">
      <div className="products-container">
        {products.map((product) => (
          <Product
            key={product.id}
            product={product}
            handleAddTocart={handleAddTocart}
          ></Product>
        ))}
      </div>
      <div className="cart-container">
        <h2>Order Sammary</h2>
        <p>Selected Items: {cart.length}</p>
      </div>
    </div>
  );
};

export default Shop;
