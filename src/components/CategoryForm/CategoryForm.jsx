import { useState, useEffect } from 'react';

export default function CategoryForm({ categoryData, onSave }) {
  const [name, setName] = useState('');
  const [sortOrder, setSortOrder] = useState('0');

  useEffect(() => {
    if (categoryData) {
      setName(categoryData.name);
      setSortOrder(categoryData.sortOrder.toString());
    } else {
      setName('');
      setSortOrder('0');
    }
  }, [categoryData]);

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    const category = {
      name: name.trim(),
      sortOrder: sortOrder,
    };
    
    try {
      if (categoryData) {
        await onSave(categoryData._id, category);
      } else {
        await onSave(category);
      }
      setName('');
      setSortOrder('0');
    } catch (err) {
      console.error('Error saving category:', err);
    }
  };
  const handleChangeName = (evt) => {
    setName(evt.target.value);
  };

  const handleChangeSortOrder = (evt) => {
    setSortOrder(evt.target.value);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
      <div className="mb-4">
        <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">Category Name:</label>
        <input
          type="text"
          id="name"
          name="name"
          value={name}
          onChange={handleChangeName}
          required
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
      <div className="mb-6">
        <label htmlFor="sortOrder" className="block text-gray-700 text-sm font-bold mb-2">Sort Order:</label>
        <input
          type="number"
          id="sortOrder"
          name="sortOrder"
          value={sortOrder}
          onChange={handleChangeSortOrder}
          required
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
      <div className="flex items-center justify-between">
        <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
          {categoryData ? 'Update Category' : 'Add Category'}
        </button>
      </div>
    </form>
  );
}
