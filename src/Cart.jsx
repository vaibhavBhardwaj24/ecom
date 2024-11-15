import React from "react";
import { useCart } from "./cartContext.jsx";

const Cart = () => {
  const { cart, dispatch } = useCart();

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  if (cart.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h2 className="text-2xl font-bold mb-4">Your cart is empty</h2>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-6">Shopping Cart</h2>

      <div className="bg-white rounded-lg shadow">
        {cart.map((item) => (
          <div key={item.id} className="flex items-center p-4 border-b">
            <img
              src={item.thumbnail}
              alt={item.title}
              className="w-20 h-20 object-cover rounded"
            />
            <div className="flex-grow ml-4">
              <h3 className="font-semibold">{item.title}</h3>
              <p className="text-gray-600">${item.price}</p>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() =>
                  dispatch({
                    type: "UPDATE_QUANTITY",
                    payload: {
                      id: item.id,
                      quantity: Math.max(0, item.quantity - 1),
                    },
                  })
                }
                className="px-2 py-1 bg-gray-200 text-gray-700 rounded-md"
              >
                -
              </button>
              <span className="mx-2">{item.quantity}</span>
              <button
                onClick={() =>
                  dispatch({
                    type: "UPDATE_QUANTITY",
                    payload: { id: item.id, quantity: item.quantity + 1 },
                  })
                }
                className="px-2 py-1 bg-gray-200 text-gray-700 rounded-md"
              >
                +
              </button>
              <button
                onClick={() =>
                  dispatch({ type: "REMOVE_FROM_CART", payload: item.id })
                }
                className="ml-4 bg-red-500 text-white p-3 rounded-lg hover:bg-red-600 duration-200"
              >
                Remove
              </button>
            </div>
          </div>
        ))}

        <div className="p-4 flex justify-between items-center">
          <button
            onClick={() => dispatch({ type: "CLEAR_CART" })}
            className="bg-gray-500 text-white p-3 rounded-lg hover:bg-gray-700 duration-200"
          >
            Clear Cart
          </button>
          <div className="text-xl font-bold">Total: ${total.toFixed(2)}</div>
        </div>
      </div>
    </div>
  );
};
export default Cart;
