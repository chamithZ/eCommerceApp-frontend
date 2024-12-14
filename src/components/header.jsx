import React from 'react';

const Header = () => {
  return (
    <header className="flex justify-between items-center p-4 bg-white shadow-sm">
      <h1 className="text-lg font-semibold">VendorPlus</h1>
      <div className="flex items-center space-x-4">
        {/* User Type Dropdown */}
        <select
          className="border  rounded-md px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-"
          defaultValue="ADMIN"
        >
          <option value="ADMIN">ADMIN</option>
          <option value="USER">USER</option>
          <option value="GUEST">GUEST</option>
        </select>

        {/* Profile Icon with Online Indicator */}
        <div className="relative">
          <div className="w-8 h-8 bg-blue-600 rounded-full"></div>
          <div className="absolute top-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
        </div>
      </div>
    </header>
  );
};

export default Header;
