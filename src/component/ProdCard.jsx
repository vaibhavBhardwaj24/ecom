import React from "react";
import { useCart } from "../cartContext.jsx";
const ProductCard = ({ product }) => {
  const { dispatch } = useCart();

  return (
    <div className="bg-white rounded-lg shadow-md h-full flex flex-col">
      <div className="h-48 overflow-hidden">
        <img
          src={product.thumbnail}
          alt={product.title}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="flex-grow p-4 flex flex-col justify-between">
        <div>
          <h3 className="font-bold text-lg mb-2">{product.title}</h3>
          <p className="text-gray-600 text-sm line-clamp-3">
            {product.description}
          </p>
          <p className="font-bold text-blue-600 text-lg mt-2">
            ${product.price.toFixed(2)}
          </p>
        </div>
        <button
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          onClick={() => dispatch({ type: "ADD_TO_CART", payload: product })}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
