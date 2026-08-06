import { createContext, useContext, useReducer, useEffect } from "react";
import StoreReduce from "../reducer/StoreReduce";

const storecontext = createContext([]);
const initialState = {
  cart: JSON.parse(localStorage.getItem("cartproducts")) || [],
  favourites: JSON.parse(localStorage.getItem("favouriteproducts")) || [],
};

const Storeprovider = ({ children }) => {
  const [reducerproducts, dispatch] = useReducer(StoreReduce, initialState);
  return (
    <storecontext.Provider value={{ reducerproducts, dispatch }}>
      {children}
    </storecontext.Provider>
  );
};
export function UseStore() {
  return useContext(storecontext);
}
export default Storeprovider;
