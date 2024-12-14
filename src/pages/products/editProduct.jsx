import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getProductService, updateProductService } from '../../services/productService'; // Assuming you have these services
import Header from '../../components/header';

const EditProduct = () => {
  const { id } = useParams(); // Get the product ID from the URL
  const [sku, setSku] = useState('');
  const [productName, setProductName] = useState('');
  const [description, setDescription] = useState('');
  const [quantity, setQuantity] = useState(0);
  const [images, setImages] = useState([]); // Store uploaded image files
  const [thumbnail, setThumbnail] = useState(null); // Store selected thumbnail
  const [loading, setLoading] = useState(true); // For handling loading state

  // Fetch product details on component mount
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const productData = await getProductService(id); // Fetch product by ID
        setSku(productData.sku);
        setProductName(productData.name);
        setDescription(productData.description);
        setQuantity(productData.quantity);
        setImages(productData.images);
        setThumbnail(productData.thumbnail); // Set current thumbnail
        setLoading(false);
      } catch (err) {
        console.error('Error fetching product:', err);
        setLoading(false);
      }
    };

    if (id) {
      fetchProduct();
    }
  }, [id]);

  const handleImageUpload = (e) => {
    const files = e.target.files;
    const uploadedImages = [];

    for (let i = 0; i < files.length; i++) {
      uploadedImages.push(files[i]);
    }

    setImages(uploadedImages);

    if (!thumbnail && uploadedImages.length > 0) {
      setThumbnail(uploadedImages[0]);
    }

    console.log('Uploaded files:', uploadedImages);
  };

  const handleThumbnailSelect = (image) => {
    setThumbnail(image);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('sku', sku);
    formData.append('name', productName);
    formData.append('description', description);
    formData.append('quantity', quantity);
    formData.append('thumbnail', thumbnail);

    images.forEach((image) => {
      formData.append('images', image);
    });

    try {
      setLoading(true);
      await updateProductService(id, formData); // Update product by ID
      alert('Product updated successfully!');
    } catch (error) {
      console.error('Error updating product:', error);
      alert('Failed to update product.');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <p>Loading product details...</p>;
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />

      <main className="flex-grow p-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold mb-6">
            PRODUCTS <span className="text-[#001eb9]">&gt; Edit product</span>
          </h2>

          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* SKU */}
            <div className="flex items-center space-x-4">
              <div className="w-1/4">
                <label htmlFor="sku" className="block text-sm font-medium text-gray-700">
                  SKU
                </label>
              </div>
              <div className="w-3/4">
                <input
                  type="text"
                  id="sku"
                  className="mt-1 block w-full rounded-md bg-[#F7F7F7] px-4 py-3 border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  value={sku}
                  onChange={(e) => setSku(e.target.value)}
                  placeholder="Enter SKU"
                />
              </div>
            </div>

            {/* Name and QTY */}
            <div className="flex items-center space-x-4">
              <div className="w-1/4">
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  Name
                </label>
              </div>
              <div className="w-3/4">
                <input
                  type="text"
                  id="name"
                  className="mt-1 block w-full rounded-md bg-[#F7F7F7] px-4 py-3 border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  value={productName}
                  onChange={(e) => setProductName(e.target.value)}
                  placeholder="Enter Name"
                />
              </div>
              <div className="w-1/4">
                <label htmlFor="quantity" className="block text-sm font-medium text-gray-700">
                  QTY
                </label>
              </div>
              <div className="w-3/4">
                <input
                  type="number"
                  id="quantity"
                  className="mt-1 block w-full rounded-md bg-[#F7F7F7] px-4 py-3 border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  value={quantity}
                  onChange={(e) => setQuantity(Number(e.target.value))}
                  placeholder="Enter Quantity"
                />
              </div>
            </div>

            {/* Product Description */}
            <div className="flex flex-col space-y-2">
              <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                Product Description
              </label>
              <textarea
                id="description"
                rows="4"
                className="mt-1 block w-full rounded-md bg-[#F7F7F7] px-4 py-3 border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Enter product description"
              />
            </div>

            {/* Product Images */}
            <div className="flex flex-col space-y-2">
              <label className="block text-sm font-medium text-gray-700">Product Images</label>
              <input
                type="file"
                name="Certificate"
                id="Certificate"
                multiple
                onChange={handleImageUpload}
                className="hidden"
              />
              <button
                type="button"
                onClick={() => document.getElementById('Certificate').click()}
                className="text-blue-500 underline hover:text-blue-600"
              >
                Add Images
              </button>

              <div className="mt-4 grid grid-cols-3 gap-4">
              {images.length > 0 &&
  images.map((image, index) => (
    <div
      key={index}
      className={`relative ${thumbnail === image ? 'border-2 border-blue-500' : ''}`}
      onClick={() => handleThumbnailSelect(image)}
    >
      <img
        src={`http://localhost:5000/api/products/images/${image}`} // Use the URL directly as the src
        alt={`Product Image ${index + 1}`}
        className="w-32 h-32 object-cover rounded-md cursor-pointer"
      />
      {thumbnail === image && (
        <div className="absolute top-0 right-0 bg-blue-500 text-white px-2 py-1 text-xs rounded-full">
          Thumbnail
        </div>
      )}
    </div>
  ))
}

              </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-end">
              <button
                type="submit"
                className="bg-blue-500 text-white py-2 px-6 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Update Product
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};

export default EditProduct;
