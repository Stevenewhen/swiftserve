import React, { useState } from 'react';

export default function CategoryList({ categories, setEditingCategoryId, deleteCategory, setEditingCategory }) {
  const [selectedCategoryId, setSelectedCategoryId] = useState('');

  const handleSelectChange = (e) => {
    const categoryId = e.target.value;
    setSelectedCategoryId(categoryId);
  };

  const handleEditClick = (categoryId) => {
    setEditingCategoryId(categoryId);
    const selectedCategory = categories.find(category => category._id === categoryId);
    setEditingCategory(selectedCategory); // Pass the selected category data to the parent component
  };

  const handleDeleteClick = (categoryId) => {
    deleteCategory(categoryId);
    setSelectedCategoryId('');
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
        <option value="" disabled hidden>
          Choose a category
        </option>
        {categories.map((category) => (
          <option key={category._id} value={category._id}>
            {category.name}
          </option>
        ))}
      </select>
      {selectedCategoryId && (
        <div className="mt-2">
          <button onClick={() => handleEditClick(selectedCategoryId)} className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-2">
            Edit Category
          </button>
          <button onClick={() => handleDeleteClick(selectedCategoryId)} className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded focus:outline-none focus:shadow-outline">
            Delete Category
          </button>
        </div>
      )}
    </div>
  );
}
