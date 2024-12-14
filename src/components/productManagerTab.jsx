import React, { useState } from 'react';
import { getSearchSuggestionsService } from '../services/productService';

const ProductManagerTab = ({ onSearch, onNewProductClick }) => {
  const [isFavorited, setIsFavorited] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  const handleFavoriteToggle = () => {
    setIsFavorited(!isFavorited);
  };

  const handleSearchChange = async (e) => {
    const value = e.target.value;
    setSearchTerm(value);

    if (value.trim().length > 0) {
      try {
        const fetchedSuggestions = await getSearchSuggestionsService(value);
        setSuggestions(fetchedSuggestions);
      } catch (error) {
        console.error('Error fetching suggestions:', error);
        setSuggestions([]);
      }
    } else {
      setSuggestions([]);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setSearchTerm(suggestion);
    setSuggestions([]); // Clear suggestions after selection
    onSearch(suggestion); // Trigger the search action
  };

  return (
    <div className="flex justify-between items-center mb-6">
      {/* Search Bar */}
      <div className="relative flex items-center space-x-4 w-2/3">
        <input
          type="text"
          placeholder="Search for products"
          value={searchTerm}
          onChange={handleSearchChange}
          className="w-full py-2 px-4 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={() => onSearch(searchTerm)}
          className="bg-[#001EB9] text-white px-4 py-2 rounded-md hover:bg-blue-600"
        >
          Search
        </button>

        {/* Suggestions Dropdown */}
        {suggestions.length > 0 && (
          <ul className="absolute top-full left-0 w-full bg-white border border-gray-300 rounded-md shadow-md mt-1 z-10">
            {suggestions.map((suggestion, index) => (
              <li
                key={index}
                onClick={() => handleSuggestionClick(suggestion)}
                className="px-4 py-2 hover:bg-blue-100 cursor-pointer"
              >
                {suggestion}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* New Product Button */}
      <button
        onClick={onNewProductClick}
        className="bg-[#001EB9] text-white px-6 py-2 rounded-md hover:bg-blue-600"
      >
        New Product
      </button>

      {/* Favorite Button */}
      <button
        onClick={handleFavoriteToggle}
        className="text-[#001EB9] text-2xl hover:text-blue-600"
      >
        {isFavorited ? '★' : '☆'}
      </button>
    </div>
  );
};

export default ProductManagerTab;
