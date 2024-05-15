import React, { useState, useEffect } from 'react';
import * as itemsAPI from '../../utilities/items-api';
import * as categoriesAPI from '../../utilities/categories-api';
import '../../index.css'

export default function EditItemForm({ item, onCancel, onSave }) {
  const [categories, setCategories] = useState([]);
  const [items, setItems] = useState([]);
  const [editingItemId, setEditingItemId] = useState(null);
  const [formData, setFormData] = useState({
    name: item.name,
    description: item.description,
    category: item.category,
    price: item.price,
    imgLink: item.imgLink,
  });

  useEffect(() => {
    const fetchCategories = async () => {
      const categoriesData = await categoriesAPI.getAll();
      setCategories(categoriesData);
      setFormData(f => ({
        ...f,
        // Only update category if it's not already set correctly
        category: categoriesData.find(cat => cat._id === item.category?._id) ? item.category._id : f.category
      }));
    };

    fetchCategories();
  }, [item]);

  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSave = async (evt) => {
    evt.preventDefault();
    try {
      await itemsAPI.editItem(item._id, formData);
      // Call the parent component's callback function to update items state
      onSave(item._id, formData);
      onCancel();
    } catch (err) {
      console.error("Error updating item:", err);
    }
  };

  return (
    <form onSubmit={handleSave}>
      <div className="mb-2">
        <label htmlFor="name" className="form-label">Name:</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="form-control"
          placeholder="Edit item name"
          required
        />
      </div>
      <div className="mb-2">
        <label htmlFor="category" className="form-label">Category:</label>
        <select
          id="category"
          name="category"
          value={formData.category}
          onChange={handleChange}
          className="form-select"
          required
        >
          <option value="" disabled={!formData.category}>Select a category...</option>
          {categories.map(category => (
            <option key={category._id} value={category._id}>{category.name}</option>
          ))}
        </select>
      </div>

      <div className="mb-2">
        <label htmlFor="description" className="form-label">Description:</label>
        <input
          type="text"
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          className="form-control"
          placeholder="Edit item description"
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
        <label htmlFor="imgLink" className="form-label">Image URL:</label>
        <input
          type="text"
          id="imgLink"
          name="imgLink"
          value={formData.imgLink}
          onChange={handleChange}
          className="form-control"
          placeholder="Enter image URL"
        />
      </div>

      <div className="d-grid gap-2">
        <button type="submit" className="btn btn-primary">Save Changes</button>
        <button type="button" onClick={onCancel} className="btn btn-secondary">Cancel</button>
      </div>
    </form>

  );
}
