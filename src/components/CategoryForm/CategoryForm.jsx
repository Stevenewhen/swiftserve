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
    <form onSubmit={handleSubmit} className="bg-white shadow-md rounded p-4">
  <div className="mb-3">
    <label htmlFor="sortOrder" className="form-label">Sort Order:</label>
    <input
      type="number"
      id="sortOrder"
      name="sortOrder"
      value={sortOrder}
      onChange={handleChangeSortOrder}
      required
      className="form-control"
    />
  </div>

  <div className="mb-3">
    <label htmlFor="name" className="form-label">Category Name:</label>
    <input
      type="text"
      id="name"
      name="name"
      value={name}
      onChange={handleChangeName}
      required
      className="form-control"
    />
  </div>

  <div className="d-grid gap-2">
    <button type="submit" className="btn btn-primary">Submit</button>
  </div>
</form>

    );

}