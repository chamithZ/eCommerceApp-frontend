import React from 'react';

const DeleteConfirmation = ({ product, onDeleteConfirm, onCancel }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded shadow-md w-96">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-red-600">Delete Confirmation</h2>
          <button
            onClick={onCancel}
            className="text-gray-400 hover:text-gray-800"
          >
            ✖
          </button>
        </div>
        <p>Are you sure you want to delete "{product.name}"? This action cannot be undone.</p>
        <div className="flex justify-end mt-6 gap-4">
          <button
            onClick={onCancel}
            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
          >
            Cancel
          </button>
          <button
            onClick={onDeleteConfirm}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmation;
