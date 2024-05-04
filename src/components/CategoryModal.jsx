// CategoryModal.jsx

import React, { useState, useEffect } from 'react';
import AddCategoryForm from './AddCategoryForm/AddCategoryForm';
import EditCategoryForm from './EditCategoryForm/EditCategoryForm';

export default function CategoryModal({ addCategory, fetchCategories, closeModal, editCategory, handleDeleteCat, category }) {
   return (
      <div className="modal">
         <div className="modal-content">
            <span className="close" onClick={closeModal}>&times;</span>
            <h2>Add/Edit Category</h2>
            <AddCategoryForm addCategory={addCategory} closeModal={closeModal} />
            <EditCategoryForm category={category}  handleDeleteCat={handleDeleteCat} />
         </div>
      </div>
   );
}
