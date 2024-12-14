import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook
import ProductManagerTab from '../../components/productManagerTab';
import Header from '../../components/header';
import { getAllProductsService, deleteProductService, updateFavoriteService } from '../../services/productService';
import DeleteConfirmation from '../../components/deleteAlert';  // Import the new component
import { ReactComponent as EditIcon } from '../../assets/edit-icon.svg';
import { ReactComponent as DeleteIcon } from '../../assets/delete-icon.svg';
import { ReactComponent as FavouriteIcon } from '../../assets/starred.svg';

const ProductList = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [favoriteProducts, setFavoriteProducts] = useState([]); // Track favorite products
  const navigate = useNavigate(); // Initialize useNavigate hook

  // Check if the user is logged in
  const isLoggedIn = !!localStorage.getItem('token'); // Assumes the JWT token is stored in local storage

  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/login'); // Redirect to login if not logged in
    }

    const fetchProducts = async () => {
      try {
        const productData = await getAllProductsService();
        setProducts(productData);
        setLoading(false);
      } catch (err) {
        setError(err.message || 'Failed to fetch products');
        setLoading(false);
      }
    };

    // Fetch favorite products from local storage (or from the server if applicable)
    const storedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
    setFavoriteProducts(storedFavorites);

    fetchProducts();
  }, [isLoggedIn, navigate]);

  const handleDeleteClick = (product) => {
    setSelectedProduct(product);
    setShowDeletePopup(true);
  };

  const confirmDelete = async () => {
    if (!selectedProduct) return;

    try {
      await deleteProductService(selectedProduct._id); // Call the delete service
      setProducts(products.filter((product) => product._id !== selectedProduct._id)); // Update the UI
      setShowDeletePopup(false);
    } catch (err) {
      setError(err.message || 'Failed to delete product');
      setShowDeletePopup(false);
    }
  };

  const handleFavoriteClick = async (product) => {
    if (!isLoggedIn) {
      navigate('/login'); // Redirect to login if not logged in
      return;
    }

    // Update the favorite status for the product
    const newFavoriteList = [...favoriteProducts, product._id];
    setFavoriteProducts(newFavoriteList);

    // Save the updated favorites to localStorage (or backend if needed)
    localStorage.setItem('favorites', JSON.stringify(newFavoriteList));

    // Optionally, call the backend to save the favorite
    try {
      await updateFavoriteService(product._id); // Call the service to update the favorite status
    } catch (err) {
      setError('Failed to add to favorites');
    }
  };

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p className="text-red-500">Error: {error}</p>;
  }

  return (
    <div className="p-6">
      <Header />
      <h1 className="text-2xl font-bold mb-6">PRODUCTS</h1>

      <ProductManagerTab
        onSearch={setSearchTerm}
        onNewProductClick={() => alert('New Product Clicked')}
      />

      <table className="w-full border-collapse border border-gray-300">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-4 text-left">SKU</th>
            <th className="p-4 text-left">IMAGE</th>
            <th className="p-4 text-left">PRODUCT NAME</th>
            <th className="p-4 text-left">PRICE</th>
            <th className="p-4 text-left">ACTIONS</th>
          </tr>
        </thead>
        <tbody>
          {filteredProducts.map((product) => (
            <tr key={product.id}>
              <td className="p-4">{product.sku}</td>
              <td className="p-4">
                <img
                  src={`http://localhost:5000/api/products/images/${product.thumbnail}`}
                  alt={product.name}
                  className="w-12 h-12 rounded-md"
                  onError={(e) => (e.target.src = 'https://via.placeholder.com/100')} // Fallback for invalid images
                />
              </td>
              <td className="p-4">{product.name}</td>
              <td className="p-4">{product.price}</td>
              <td className="p-4 flex items-center gap-4">
                <EditIcon
                  className="w-6 h-6 text-blue-500 cursor-pointer"
                  onClick={() => navigate(`/editProduct/${product._id}`)} // Navigate to the edit page with product ID
                />
                <DeleteIcon
                  className="w-6 h-6 text-red-500 cursor-pointer"
                  onClick={() => handleDeleteClick(product)}
                />
                <FavouriteIcon
                  className={`w-6 h-6 cursor-pointer ${favoriteProducts.includes(product._id) ? 'text-yellow-500' : 'text-gray-500'}`}
                  onClick={() => handleFavoriteClick(product)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Delete Confirmation Popup */}
      {showDeletePopup && (
        <DeleteConfirmation
          product={selectedProduct}
          onDeleteConfirm={confirmDelete}
          onCancel={() => setShowDeletePopup(false)}
        />
      )}
    </div>
  );
};

export default ProductList;
