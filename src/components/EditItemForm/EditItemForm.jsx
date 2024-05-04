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
      <form onSubmit={handleEditItem}>
         <label>
            Item Number:
            <input
               type="number"
               name="itemNumber"
               value={formData.itemNumber}
               onChange={handleChange}
               required
            />
         </label>

         <label htmlFor="name">
            Name:
            <input
               type="text"
               id="name"
               name="name"
               value={formData.name}
               onChange={handleChange}
               placeholder="Edit item name"
               required
            />
         </label>

         <label htmlFor="description">
            Description:
            <input
               type="text"
               id="description"
               name="description"
               value={formData.description}
               onChange={handleChange}
               placeholder="Edit item description"
            />
         </label>

         <label htmlFor="category">
            Category:
            <select
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
         </label>
         <label>
            Price:
            <input
               type="number"
               name="price"
               value={formData.price}
               onChange={handleChange}
               placeholder="Enter item price"
               required
            />
         </label>

         <button type="submit">Save Changes</button>
         <button type="button" onClick={onCancel}>Cancel</button>
      </form>
   );
}
