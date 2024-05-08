import React, { useState } from 'react';

export default function CategoryList({ categories = [], setEditingCategoryId, deleteCategory, setEditingCategory }) {
  const [selectedCategoryId, setSelectedCategoryId] = useState('');

  const handleSelectChange = (evt) => {
    setSelectedCategoryId(evt.target.value);
  };

  return (
    <div>
      <label htmlFor="categorySelect" className="block text-sm font-medium text-gray-700">
        Select a category:
      </label>
      <select
        id="categorySelect"
        name="category"
        className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        value={selectedCategoryId}
        onChange={handleSelectChange}
      >
        <option value="" disabled hidden>Choose a category</option>
        {categories.map((category) => (
          category && category._id && (
            <option key={category._id} value={category._id}>
              {category.name}
            </option>
          )
        ))}
      </select>
      {selectedCategoryId && (
        <div className="action-buttons mt-2">
          <button
            onClick={() => {
              const selectedCategory = categories.find(category => category._id === selectedCategoryId);
              setEditingCategory(selectedCategory);
              setEditingCategoryId(selectedCategoryId);
            }}
            className="btn btn-primary mr-2"
          >
            Edit Category
          </button>
          <button
            onClick={() => {
              if (window.confirm("Are you sure you want to delete this category?")) {
                deleteCategory(selectedCategoryId);
                setSelectedCategoryId('');
              }
            }}
            className="btn btn-danger"
          >
            Delete Category
          </button>

        </div>
      )}
    </div>
  );
}
