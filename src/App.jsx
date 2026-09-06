import { Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";

import Home from "./Pages/Home";
import Cart from "./Pages/Cart";
import Favourites from "./Pages/Favourites";
import ProductDetails from "./Pages/ProductDetails";
import Shop from "./Pages/Shop";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import ProtectedRoute from "./layouts/ProtectedRoute";
export default function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/shop/:category" element={<Shop />} />
        <Route
          path="/cart"
          element={
            <ProtectedRoute>
              <Cart />
            </ProtectedRoute>
          }
        />
        <Route
          path="/Favourites"
          element={
            <ProtectedRoute>
              <Favourites />
            </ProtectedRoute>
          }
        />
        <Route path="/product/:id" element={<ProductDetails />} />
      </Route>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
    </Routes>
  );
}
