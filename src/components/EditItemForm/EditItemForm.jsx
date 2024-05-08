import React, { useState, useEffect } from 'react';
import * as itemsAPI from '../../utilities/items-api';
import * as categoriesAPI from '../../utilities/categories-api';

export default function EditItemForm({ item, onCancel, onSave }) {
   const [categories, setCategories] = useState([]);
   const [formData, setFormData] = useState({
      itemNumber: item?.itemNumber || '',
      name: item?.name || '',
      description: item?.description || '',
      category: item?.category || '',
      price: item?.price || '',
   });

   useEffect(() => {
      const fetchCategories = async () => {
         try {
            const categoriesData = await categoriesAPI.getAll();
            setCategories(categoriesData);
         } catch (error) {
            console.error('Error fetching categories:', error);
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
   };

   async function handleEditItem(evt) {
      evt.preventDefault();

      try {
         const updatedItem = { ...item, ...formData };
         await itemsAPI.editItem(item._id, updatedItem);
         onSave(item._id, updatedItem);
         onCancel();
      } catch (err) {
         console.error("Error updating item:", err);
      }
   }

   return (
      <form onSubmit={handleEditItem} className="bg-white shadow-md rounded p-4">
      <div className="mb-3">
        <label htmlFor="itemNumber" className="form-label">Item Number:</label>
        <input
          type="number"
          id="itemNumber"
          name="itemNumber"
          value={formData.itemNumber}
          onChange={handleChange}
          className="form-control"
          required
        />
      </div>
    
      <div className="mb-3">
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
      <div className="mb-3">
        <label htmlFor="category" className="form-label">Category:</label>
        <select
          id="category"
          name="category"
          value={formData.category}
          onChange={handleChange}
          className="form-select"
          required
        >
          <option value="">Select category...</option>
          {categories.map(category => (
            <option key={category._id} value={category._id}>{category.name}</option>
          ))}
        </select>
      </div>
    
      <div className="mb-3">
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
        <input
          type="number"
          id="price"
          name="price"
          value={formData.price}
          onChange={handleChange}
          className="form-control"
          placeholder="Enter item price"
          required
        />
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
