import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { CartProvider } from "./cartContext.jsx";
import Dashboard from "./dashboard.jsx";
import Cart from "./Cart.jsx";
import { useCart } from "./cartContext.jsx";

const Navigation = () => {
  const { cart } = useCart();
  const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <nav className="bg-blue-600 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-xl font-bold">
          E-Shop
        </Link>
        <Link to="/cart" className="flex items-center">
          Cart ({itemCount})
        </Link>
      </div>
    </nav>
  );
};

const App = () => {
  return (
    <Router>
      <CartProvider>
        <div className="min-h-screen bg-gray-100">
          <Navigation />
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/cart" element={<Cart />} />
          </Routes>
        </div>
      </CartProvider>
    </Router>
  );
};

export default App;
