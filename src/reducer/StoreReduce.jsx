import { useState } from "react";

function StoreReduce(currentstate, action) {
  switch (action.type) {
    case "toggle-cart": {
      const cart = currentstate.cart.some(
        (item) => item.id === action.payload.id,
      )
        ? currentstate.cart.filter((item) => item.id !== action.payload.id)
        : [
            ...currentstate.cart,
            {
              id: action.payload.id,
              quantity: 1,
              weight: action.payload.weight,
              price: action.payload.price,
              stock: action.payload.stock,
            },
          ];

      localStorage.setItem("cartproducts", JSON.stringify(cart));

      return {
        ...currentstate,
        cart,
      };
    }
    case "toggle-favourite": {
      const favourites = currentstate.favourites.includes(action.payload.id)
        ? currentstate.favourites.filter((item) => item !== action.payload.id)
        : [...currentstate.favourites, action.payload.id];

      localStorage.setItem("favouriteproducts", JSON.stringify(favourites));

      return {
        ...currentstate,
        favourites,
      };
    }
    case "INCREASE_QUANTITY": {
      const cart = currentstate.cart.map((item) =>
        item.id === action.payload.id
          ? {
              ...item,
              quantity: item.quantity + 1,
            }
          : item,
      );

      localStorage.setItem("cartproducts", JSON.stringify(cart));

      return {
        ...currentstate,
        cart,
      };
    }
    case "DECREASE_QUANTITY": {
      const cart = currentstate.cart.map((item) =>
        item.id === action.payload.id
          ? {
              ...item,
              quantity: item.quantity - 1,
            }
          : item,
      );

      localStorage.setItem("cartproducts", JSON.stringify(cart));

      return {
        ...currentstate,
        cart,
      };
    }
    default: {
      throw alert("eeror");
    }
  }
}

export default StoreReduce;
