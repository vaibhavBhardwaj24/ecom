import { useState, useEffect } from "react";
import axios from "axios";

export const useProducts = (page = 1, searchQuery = "") => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const limit = 12;
        const skip = (page - 1) * limit;
        const url = searchQuery
          ? `https://dummyjson.com/products/search?q=${searchQuery}&limit=${limit}&skip=${skip}`
          : `https://dummyjson.com/products?limit=${limit}&skip=${skip}`;

        const response = await axios.get(url);
        setProducts(response.data.products);
        setTotalPages(Math.ceil(response.data.total / limit));
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [page, searchQuery]);

  return { products, loading, error, totalPages };
};
