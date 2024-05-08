import React, { useState, useEffect } from 'react';  // Corrected import
import * as categoriesAPI from '../../utilities/categories-api';
import * as itemsAPI from '../../utilities/items-api';
import '../../index.css'

export default function AddItemForm({ addItem, user}) {
  const [categories, setCategories] = useState([]);

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: '',
    price: 0.00,
    itemNumber: '',
    imgLink: '' // Add imgLink to the form data
  });

  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const fetchedCategories = await categoriesAPI.getAll();
        setCategories(fetchedCategories);
      } catch (err) {
        console.error('Error fetching categories:', err);
      }
    };

    fetchCategories();
  }, []);

  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    if (error) setError('');
  };

  const handleAddItem = async (evt) => {
    evt.preventDefault();

    if (submitting) return;

    if (!formData.name.trim() || !formData.category) {
      setError('Name and category are required');
      return;
    }

    const description = formData.description ? formData.description.trim() : '';

    setSubmitting(true);

    const completeFormData = {
      ...formData,
      name: formData.name.trim(),
      description,
      user: user._id
    };

    const newItem = await itemsAPI.createItem(completeFormData);
    addItem(newItem);
    setFormData({ name: '', description: '', category: '', imgLink: '' }); // Reset imgLink

    setSubmitting(false);
  };

  return (
    <form onSubmit={handleAddItem}>
      <div className="mb-2">
        <label htmlFor="itemNumber" className="form-label">Item Number:</label>
        <input
          type="number"
          className="form-control"
          id="itemNumber"
          name="itemNumber"
          value={formData.itemNumber}
          onChange={handleChange}
          placeholder="Enter item number"
          required
        />
      </div>
      <div className="mb-3">
        <label htmlFor="name" className="form-label">Name:</label>
        <input
          type="text"
          className="form-control"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Enter item name"
          required
        />
      </div>
      <div className="mb-3">
        <label htmlFor="price" className="form-label">Price:</label>
        <div className="input-group">
          <span className="input-group-text">$</span>
          <input
            type="number"
            className="form-control"
            id="price"
            name="price"
            value={formData.price}
            onChange={handleChange}
            placeholder="Enter item price"
            required
          />
        </div>
      </div>
      <div className="mb-3">
        <label htmlFor="description" className="form-label">Description:</label>
        <input
          type="text"
          className="form-control"
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Enter item description"
        />
      </div>
      <div className="mb-3">
        <label htmlFor="category" className="form-label">Category:</label>
        <select
          className="form-select"
          id="category"
          name="category"
          value={formData.category}
          onChange={handleChange}
          required
        >
          <option value="">Select category...</option>
          {categories.map(category => (
            <option key={category._id} value={category._id}>{category.name}</option>
          ))}
        </select>
      </div>
      <div className="mb-3">
        <label htmlFor="imgLink" className="form-label">Image Link:</label>
        <input
          type="url"
          className="form-control"
          id="imgLink"
          name="imgLink"
          value={formData.imgLink}
          onChange={handleChange}
          placeholder="Enter image URL"
        />
      </div>
      
      <button type="submit" className="btn btn-primary btn-lrg">Add Item</button>
    </form>
  );
}