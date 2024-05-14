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
        <form onSubmit={handleSubmit} className="bg-white shadow-md rounded p-4">
            <div className="mb-3">
                <label htmlFor="name" className="form-label">Category Name:</label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="form-control"
                />
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
                />
            </div>

            <div className="mb-3">
                <label htmlFor="sortOrder" className="form-label">Sort Order:</label>
                <input
                    type="number"
                    id="sortOrder"
                    name="sortOrder"
                    value={formData.sortOrder}
                    onChange={handleChange}
                    className="form-control"
                />
            </div>

            <div className="d-grid gap-2">
                <button type="submit" className="btn btn-primary">Save Changes</button>
                <button type="button" onClick={onCancel} className="btn btn-secondary">Cancel</button>
                <button type="button" onClick={() => onDelete(formData.selectedCategoryId)} className="btn btn-danger">Delete</button>
            </div>
        </form>

    );
}