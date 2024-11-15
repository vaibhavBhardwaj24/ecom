import React, { useState, useCallback } from "react";
import { useProducts } from "./useProduct.js";
import ProductCard from "./component/ProdCard.jsx";
import { Search } from "lucide-react";

const Dashboard = () => {
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const { products, loading, error, totalPages } = useProducts(
    page,
    searchQuery
  );

  const filteredProducts = useCallback(
    () =>
      products.filter((product) =>
        product.title.toLowerCase().includes(searchQuery.toLowerCase())
      ),
    [products, searchQuery]
  );

  const handleSearch = () => {
    setPage(1); // Reset to the first page when searching
  };

  if (loading) return <div className="text-center">Loading...</div>;
  if (error) return <div className="text-center text-red-500">{error}</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="w-full flex justify-center items-center max-w-md mx-auto mb-8">
        <input
          type="text"
          placeholder="Search products..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={handleSearch}
          className="bg-gray-400 hover:bg-gray-500 duration-200 rounded-md m-2 p-2"
        >
          <Search height={25} width={25} />
        </button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredProducts().map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      <div className="flex justify-center mt-8 gap-4">
        <button
          onClick={() => setPage((p) => Math.max(1, p - 1))}
          disabled={page === 1}
          className="bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 duration-200"
        >
          Previous
        </button>
        <button
          onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
          disabled={page === totalPages}
          className="bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 duration-200"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
