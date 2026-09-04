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

      return {
        ...currentstate,
        cart,
      };
    }
    case "SET_CART": {
      return {
        ...currentstate,
        cart: action.payload,
      };
    }
    case "toggle-favourite": {
      const favourites = currentstate.favourites.includes(action.payload.id)
        ? currentstate.favourites.filter((item) => item !== action.payload.id)
        : [...currentstate.favourites, action.payload.id];

      return {
        ...currentstate,
        favourites,
      };
    }
    case "SET_FAVOURITES": {
      return {
        ...currentstate,
        favourites: action.payload,
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
