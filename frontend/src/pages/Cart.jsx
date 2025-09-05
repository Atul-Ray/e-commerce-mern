import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeFromCart } from "../store/cartSlice.js";



function Cart() {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.cart);
  const handleremoveFromCart = (id) => {
    dispatch(removeFromCart(id));
  };
  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-center mb-6">🛒 Your Cart</h1>

      {cartItems.length === 0 ? (
        <p className="text-center text-gray-600">Your cart is empty.</p>
      ) : (
        <div className="max-w-3xl mx-auto bg-white p-6 rounded shadow">
          {cartItems.map((item) => (
            <div
              key={item.id}
              className="flex justify-between items-center border-b py-4"
            >
              <div>
                <h2 className="text-lg font-semibold">{item.name}</h2>
                <p className="text-sm text-gray-500">
                  Rs.{item.price} × {item.quantity}
                </p>
              </div>
              <button
                onClick={() => handleremoveFromCart(item.id)}
                className="text-red-600 hover:text-red-800"
              >
              remove
              </button>
            </div>
          ))}

          <div className="flex justify-between items-center mt-6">
            <h3 className="text-xl font-bold">Total:</h3>
            <span className="text-xl font-bold">Rs.{total.toFixed(2)}</span>
          </div>
        </div>
      )}
    </div>
  );
}

export default Cart;
