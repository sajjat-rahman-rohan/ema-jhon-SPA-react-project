import React, { useEffect, useState } from "react";
import { addToDb, getShoppingCart } from "../../utilities/fakedb";
import Cart from "../Cart/Cart";
import Product from "../Product/Product";
import "./Shop.css";

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    fetch("../../../public/products.json")
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);

  useEffect(() => {
    // console.log(products);
    const storedCart = getShoppingCart();
    const saveCart = [];
    // console.log(storedCart);
    // step 1: get id of the addedProduct
    for (const id in storedCart) {
      // console.log(id);
      // step 2: get product from products state by using id
      const addedProduct = products.find((products) => products.id === id);
      // console.log(addedProduct);
      if (addedProduct) {
        // step 3: add quantity
        const quantity = storedCart[id];
        // console.log(quantity);
        addedProduct.quantity = quantity;
        // console.log(addedProduct);
        // step 4: add the added product to the saved cart
        saveCart.push(addedProduct);
      }
    }
    // step 5: set the cart
    setCart(saveCart);
  }, [products]);

  const handleAddTocart = (product) => {
    // console.log(product);
    // cart.push(product);
    let newCart = [];
    // const newCart = [...cart, product];
    // if product doesn't exist in the cart, then set quantity = 1
    // if exist update quantity by 1
    const exists = cart.find((pd) => pd.id === product.id);
    if (!exists) {
      product.quantity = 1;
      newCart = [...cart, product];
    } else {
      exists.quantity = exists.quantity + 1;
      const remaining = cart.filter((pd) => pd.id !== product.id);
      newCart = [...remaining, exists];
    }

    setCart(newCart);
    addToDb(product.id);
  };

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
        <Cart cart={cart}></Cart>
      </div>
    </div>
  );
};

export default Shop;
