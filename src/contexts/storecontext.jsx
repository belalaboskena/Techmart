import { createContext, useContext, useReducer } from "react";
import StoreReduce from "../reducer/StoreReduce";

const storecontext = createContext([]);
const initialState = {
  cart: JSON.parse(localStorage.getItem("cartproducts")) || [],
  favourites: JSON.parse(localStorage.getItem("favouriteproducts")) || [],
};

const Storeprovider = ({ children }) => {
  const [reducerproducts, dispatch] = useReducer(StoreReduce, initialState);
  const NewarrivalsIDS = [159, 99, 107, 78, 112];
  const BestsellersIDS = [123, 101, 78, 154];
  const SallesIDS = [104, 109, 106,  112];
  return (
    <storecontext.Provider
      value={{
        reducerproducts,
        dispatch,
        NewarrivalsIDS,
        BestsellersIDS,
        SallesIDS,
      }}
    >
      {children}
    </storecontext.Provider>
  );
};
export function UseStore() {
  return useContext(storecontext);
}
export default Storeprovider;
