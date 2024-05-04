import { useEffect } from 'react';
import React, { useState } from 'react';
import * as categoriesAPI from '../../utilities/categories-api';
import * as itemsAPI from '../../utilities/items-api';
import '../../index.css'

export default function AddItemForm({ addItem, user }) {
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState('');

  const [formData, setFormData] = useState({
    name: '',
    description: '', // Initialize as an empty string
    category: '',
    price: 0.00,
    itemNumber: '',
  });

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

  async function handleDropdownClick() {
    try {
      const fetchedCategories = await categoriesAPI.getAll();
      setCategories(fetchedCategories);
    } catch (err) {
      console.error('Error fetching categories:', err);
    }
  }

  function handleChange(evt) {
    const { name, value } = evt.target;

    setFormData({
      ...formData,
      [name]: value,
    });

    if (error) setError('');
  }

  async function handleAddItem(evt) {
    evt.preventDefault();
    if (!formData.name.trim() || !formData.category) {
      setError('Name and category are required');
      return;
    }

    const description = formData.description ? formData.description.trim() : '';

    try {
      const completeFormData = {
        name: formData.name.trim(),
        itemNumber: formData.itemNumber,
        price: formData.price,
        description: description,
        category: formData.category,
        user: user._id
      };
      const newItem = await itemsAPI.createItem(completeFormData);
      addItem(newItem);
      setFormData({ name: '', description: '', category: '' });
    } catch (err) {
      console.error("Error adding item:", err.message);
      setError('Failed to add item');
    }
  }


  return (
    <form onSubmit={handleAddItem}>
      <table>
        <tbody>
          <tr>
            <td>Item Number:</td>
            <td colSpan="2">
              <input
                type="integer"
                name="itemNumber"
                value={formData.itemNumber}
                onChange={handleChange}
                placeholder="Enter item number"
                required
              />
            </td>
          </tr>
          <tr>
            <td>Name:</td>
            <td colSpan="2">
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter item name"
                required
              />
            </td>
          </tr>
          <tr>
            <td>Description:</td>
            <td colSpan="2">
              <input
                type="text"
                name="description"
                value={formData.description} // Ensure this is correctly bound
                onChange={handleChange}
                placeholder="Enter item description"
                style={{ width: 'calc(100% - 20px)' }}
              />

            </td>
          </tr>
          <tr>
            <td>Category:</td>
            <td colSpan="2">
              <select
                name="category"
                id="categoryId"
                value={formData.category}
                onChange={handleChange}
                required
                onClick={handleDropdownClick}
              >
                <option value="">Select category...</option>
                {categories.map(category => (
                  <option key={category._id} value={category._id}>{category.name}</option>
                ))}
              </select>
            </td>
          </tr>
          <tr>
            <td>Price:</td>
            <td colSpan="2">
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <span>$</span>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  placeholder="Enter item price"
                  required
                  style={{ marginLeft: '5px', width: 'calc(100% - 20px)' }}
                />
              </div>
            </td>
          </tr>
          <tr>
            <td colSpan="3">
              <button type="submit">Add Item</button>
            </td>
          </tr>
          {error && (
            <tr>
              <td colSpan="3">
                <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </form>
  );
}
