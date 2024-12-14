import axios from 'axios';

export const createProductService = async (productData) => {
  try {
    console.log(productData)
    const response = await axios.post('http://localhost:5000/api/products', productData, {
      headers: {
        "Content-Type": "multipart/form-data", // Send as JSON
      },
    });

    return response.data; // Return saved product
  } catch (error) {
    console.error('Error creating product:', error);

    // Handle error response or fallback to a generic error
    throw error.response ? error.response.data : { message: 'Server Error' };
  }
};

export const getAllProductsService = async () => {
  try {
    const response = await axios.get('http://localhost:5000/api/products');
    return response.data; // Return the list of products
  } catch (error) {
    console.error('Error fetching products:', error);

    // Handle error response or fallback to a generic error
    throw error.response ? error.response.data : { message: 'Server Error' };
  }
};

export const deleteProductService = async (productId) => {
  try {
    const response = await axios.delete(
      `http://localhost:5000/api/products/${productId}`
    );

    return response.data; // Return success message or deleted product data
  } catch (error) {
    console.error("Error deleting product:", error);

    // Handle error response or fallback to a generic error
    throw error.response ? error.response.data : { message: "Server Error" };
  }
};

export const updateProductService = async (productId, updatedData) => {
  try {
    const response = await axios.put(
      `http://localhost:5000/api/products/${productId}`,
      updatedData,
      {
        headers: {
          "Content-Type": "application/json", 
        },
      }
    );
    return response.data; // Return updated product
  } catch (error) {
    console.error("Error updating product:", error);

    // Handle error response or fallback to a generic error
    throw error.response ? error.response.data : { message: "Server Error" };
  }
};

export const getProductService = async (productId) => {
  try {
    const response = await axios.get(`http://localhost:5000/api/products/${productId}`);
    return response.data; // Return the product data
  } catch (error) {
    console.error('Error fetching product:', error);

    // Handle error response or fallback to a generic error
    throw error.response ? error.response.data : { message: 'Server Error' };
  }
};

export const getSearchSuggestionsService = async (query) => {
  console.log("working");
  try {
    const response = await axios.get(`http://localhost:5000/api/products/suggestions`, {
      params: { q: query }, // Send query as URL parameter
    });
    return response.data; // Return list of suggestions
  } catch (error) {
    console.error("Error fetching search suggestions:", error);

    // Handle error response or fallback to a generic error
    throw error.response ? error.response.data : { message: "Server Error" };
  }
};

export const getSearchResultsService = async (query) => {
  try {
    const response = await axios.get(`http://localhost:5000/api/search/results`, {
      params: { q: query }, // Send query as URL parameter
    });
    return response.data; // Return search results
  } catch (error) {
    console.error("Error fetching search results:", error);

    // Handle error response or fallback to a generic error
    throw error.response ? error.response.data : { message: "Server Error" };
  }
};


// Method to update the user's favorites
export const updateFavoriteService = async (favorites) => {
  try {
    const response = await axios.put(`http://localhost:5000/api/users/favorites`, { favorites }, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`, // Assuming you're using a JWT token for authentication
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error updating favorites:', error);
    throw error; // Throw the error to be handled in the component
  }
};