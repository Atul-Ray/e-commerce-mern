import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import Cart from "./pages/Cart";
import ProductList from "./pages/ProductList";
import {Toaster} from 'react-hot-toast'

export default function App() {
  return (
    <div>
      <Toaster position="top-right" reverseOrder={false} />
      <Routes>
        <Route path="/" element={<HomePage />}>
          <Route path="/cart" element={<Cart/>}></Route>
          <Route path="/login" element={<Login/>}></Route>
          <Route path="/" element={<ProductList/>}></Route>
        </Route>
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </div>
  );
}
