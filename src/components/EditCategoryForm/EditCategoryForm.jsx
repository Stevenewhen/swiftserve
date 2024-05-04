import React, { useState } from 'react';

export default function EditCategoryForm({ category, onSave, onCancel, onDelete }) {
    const [formData, setFormData] = useState({
        name: category?.name || '',
        description: category?.description || '',
        sortOrder: category?.sortOrder || '',
        selectedCategoryId: category?._id || ''
    });    

    const handleChange = (evt) => {
        const { name, value } = evt.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (evt) => {
        evt.preventDefault();
        try {
           await onSave(formData.selectedCategoryId, formData);
        } catch (err) {
           console.error("Error updating category:", err);
        }
     };

    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor="name">
                Category Name:
                <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
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
                />
            </label>
            <label htmlFor="sortOrder">
                Sort Order:
                <input
                    type="number"
                    id="sortOrder"
                    name="sortOrder"
                    value={formData.sortOrder}
                    onChange={handleChange}
                />
            </label>
            
            <button type="submit">Save Changes</button>
            <button type="button" onClick={onCancel}>Cancel</button>
            <button type="button" onClick={() => onDelete(formData.selectedCategoryId)}>Delete</button>
        </form>
    );
}
