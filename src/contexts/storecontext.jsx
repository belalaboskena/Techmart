import {
  createContext,
  useContext,
  useReducer,
  useState,
  useEffect,
} from "react";
import StoreReduce from "../reducer/StoreReduce";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import Fade from "@mui/material/Fade";
import { AuthContext } from "../contexts/AuthContext";
import { supabase } from "../supabase";
const storecontext = createContext([]);
const initialState = {
  cart: JSON.parse(localStorage.getItem("cartproducts")) || [],
  favourites: JSON.parse(localStorage.getItem("favouriteproducts")) || [],
};

const Storeprovider = ({ children }) => {
  const [reducerproducts, dispatch] = useReducer(StoreReduce, initialState);
  const NewarrivalsIDS = [159, 99, 107, 78, 112];
  const BestsellersIDS = [123, 101, 78, 154];
  const SallesIDS = [104, 109, 106, 112];
  const { user } = useContext(AuthContext);

  // snakebar stat
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });
  const showSnackbar = (message, severity = "success") => {
    setSnackbar({
      open: true,
      message,
      severity,
    });
  };
  //

  useEffect(() => {
    const loadUserData = async () => {
      if (!user) {
        dispatch({
          type: "SET_FAVOURITES",
          payload: [],
        });

        dispatch({
          type: "SET_CART",
          payload: [],
        });

        return;
      }

      // Load Wishlist
      const { data: wishlistData, error: wishlistError } = await supabase
        .from("wishlist")
        .select("product_id")
        .eq("user_id", user.id);

      if (wishlistError) {
        console.log("Load wishlist error:", wishlistError);
      } else {
        const favourites = wishlistData.map((item) => item.product_id);

        dispatch({
          type: "SET_FAVOURITES",
          payload: favourites,
        });
      }

      // Load Cart
      const { data: cartData, error: cartError } = await supabase
        .from("cart")
        .select("product_id, quantity, weight, price, stock")
        .eq("user_id", user.id);

      if (cartError) {
        console.log("Load cart error:", cartError);
      } else {
        const cart = cartData.map((item) => ({
          id: item.product_id,
          quantity: item.quantity,
          weight: item.weight,
          price: item.price,
          stock: item.stock,
        }));

        dispatch({
          type: "SET_CART",
          payload: cart,
        });
      }
    };

    loadUserData();
  }, [user]);

  const togglecart = async (id, weight, price, stock) => {
    if (!user) {
      showSnackbar(
        "Please login first to add products to your cart.",
        "warning",
      );
      return;
    }

    const isInCart = reducerproducts.cart.some((item) => item.id === id);

    if (isInCart) {
      const { error } = await supabase
        .from("cart")
        .delete()
        .eq("user_id", user.id)
        .eq("product_id", id);

      if (error) {
        console.log("Remove cart error:", error);
        return;
      }

      dispatch({
        type: "toggle-cart",
        payload: {
          id,
          weight,
          price,
          stock,
        },
      });

      showSnackbar("Product removed from cart", "error");

      return;
    }

    const { data, error } = await supabase
      .from("cart")
      .insert({
        user_id: user.id,
        product_id: id,
        quantity: 1,
        weight,
        price,
        stock,
      })
      .select();

    if (error) {
      console.log("Add cart error:", error);
      return;
    }

    console.log("Cart insert:", data);

    dispatch({
      type: "toggle-cart",
      payload: {
        id,
        weight,
        price,
        stock,
      },
    });

    showSnackbar("Product added to cart", "success");
  };
  const increaseQuantity = async (id) => {
    if (!user) {
      showSnackbar("Please login first to update your cart.", "warning");
      return;
    }

    const item = reducerproducts.cart.find((item) => item.id === id);

    if (!item) return;

    const newQuantity = item.quantity + 1;

    const { error } = await supabase
      .from("cart")
      .update({
        quantity: newQuantity,
      })
      .eq("user_id", user.id)
      .eq("product_id", id);

    if (error) {
      console.log("Increase quantity error:", error);
      return;
    }

    dispatch({
      type: "INCREASE_QUANTITY",
      payload: {
        id,
      },
    });
  };
  const decreaseQuantity = async (id) => {
    if (!user) {
      showSnackbar("Please login first to update your cart.", "warning");
      return;
    }

    const item = reducerproducts.cart.find((item) => item.id === id);

    if (!item) return;

    if (item.quantity <= 1) return;

    const newQuantity = item.quantity - 1;

    const { error } = await supabase
      .from("cart")
      .update({
        quantity: newQuantity,
      })
      .eq("user_id", user.id)
      .eq("product_id", id);

    if (error) {
      console.log("Decrease quantity error:", error);
      return;
    }

    dispatch({
      type: "DECREASE_QUANTITY",
      payload: {
        id,
      },
    });
  };
  const toggleFavourite = async (id) => {
    if (!user) {
      showSnackbar(
        "Please login first to add products to your wishlist.",
        "warning",
      );
      return;
    }

    const isFavourite = reducerproducts.favourites.includes(id);

    if (isFavourite) {
      // Remove from Supabase
      const { error } = await supabase
        .from("wishlist")
        .delete()
        .eq("user_id", user.id)
        .eq("product_id", id);

      if (error) {
        console.log("Remove wishlist error:", error);
        return;
      }

      dispatch({
        type: "toggle-favourite",
        payload: {
          id,
        },
      });

      showSnackbar("Product removed from wishlist", "error");

      return;
    }

    // Add to Supabase
    const { data, error } = await supabase
      .from("wishlist")
      .insert({
        user_id: user.id,
        product_id: id,
      })
      .select();

    if (error) {
      console.log("Add wishlist error:", error);
      return;
    }

    console.log("Wishlist insert:", data);

    dispatch({
      type: "toggle-favourite",
      payload: {
        id,
      },
    });

    showSnackbar("Product added to wishlist", "success");
  };

  return (
    <storecontext.Provider
      value={{
        reducerproducts,
        dispatch,
        NewarrivalsIDS,
        BestsellersIDS,
        SallesIDS,
        togglecart,
        toggleFavourite,
        increaseQuantity,
        decreaseQuantity,
      }}
    >
      {children}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={2000}
        onClose={() =>
          setSnackbar((prev) => ({
            ...prev,
            open: false,
          }))
        }
        slots={{
          transition: Fade,
        }}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
      >
        <Alert
          severity={snackbar.severity}
          variant="filled"
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </storecontext.Provider>
  );
};
export function UseStore() {
  return useContext(storecontext);
}
export default Storeprovider;
