import React, { useState, useEffect } from 'react';
import * as itemsAPI from '../../utilities/items-api';
import * as categoriesAPI from '../../utilities/categories-api';
import ItemList from '../../components/ItemList/ItemList';
import AddItemForm from '../../components/AddItemForm/AddItemForm';
import EditItemForm from '../../components/EditItemForm/EditItemForm';
import CategoryList from '../../components/CategoryList/CategoryList';
import CategoryForm from '../../components/CategoryForm/CategoryForm';
import EditCategoryForm from '../../components/EditCategoryForm/EditCategoryForm';
import '../../index.css';

export default function ItemsPage({ user }) {
  const [items, setItems] = useState([]);
  const [categories, setCategories] = useState([]);
  const [editingItemId, setEditingItemId] = useState(null);
  const [editingCategoryId, setEditingCategoryId] = useState(null);
  const [editingCategory, setEditingCategory] = useState(null);
  const [showAddCategoryForm, setShowAddCategoryForm] = useState(false);


  useEffect(function() {
    async function getData() {
      try {
        const fetchedItems = await itemsAPI.getAll();
        const fetchedCategories = await categoriesAPI.getAll();
        setItems(fetchedItems);
        setCategories(fetchedCategories);
      } catch (err) {
        console.error('Error fetching data:', err);
      }
    }
  
    getData();
  }, []);
  

  async function addItem(newItem) {
    try {
      const addedItem = await itemsAPI.createItem(newItem);
      setItems(prevItems => [...prevItems, addedItem]);
    } catch (err) {
      console.error('Error adding item:', err);
    }
  }
  
  async function handleAddCategory(categoryData) {
    try {
      const addedCategory = await categoriesAPI.createCategory(categoryData);
      setCategories(prevCategories => [...prevCategories, addedCategory]);
      setShowAddCategoryForm(false);
    } catch (err) {
      console.error('Error adding category:', err);
    }
  }
  
  async function deleteItem(itemId) {
    try {
      await itemsAPI.deleteItem(itemId);
      setItems(prevItems => prevItems.filter(item => item._id !== itemId));
    } catch (err) {
      console.error('Error deleting item:', err);
    }
  }
  
  async function deleteCategory(categoryId) {
    try {
      await categoriesAPI.deleteCategory(categoryId);
      setCategories(prevCategories => prevCategories.filter(category => category._id !== categoryId));
    } catch (err) {
      console.error('Error deleting category:', err);
    }
  }
  
  async function handleSaveChanges(itemId, formData) {
    try {
      const updatedItem = await itemsAPI.editItem(itemId, formData);
      setItems(prevItems => prevItems.map(item => item._id === itemId ? updatedItem : item));
      setEditingItemId(null);
    } catch (err) {
      console.error("Error updating item:", err);
      alert("Failed to update the item: " + err.message);
    }
  }
  
  async function handleSaveCategory(categoryId, formData) {
    try {
      const updatedCategory = await categoriesAPI.editCategory(categoryId, formData);
      setCategories(prevCategories => prevCategories.map(category => (category._id === updatedCategory._id ? updatedCategory : category)));
      setEditingCategoryId(null);
      setEditingCategory(null);
    } catch (err) {
      console.error("Error editing category:", err);
    }
  }
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-bold mb-4">Add Item</h2>
          <AddItemForm addItem={addItem} user={user} categories={categories} />
        </div>
      </div>
      <div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-bold mb-4">Manage Categories</h2>
          <div className="flex justify-between items-center mb-4">
          <CategoryList
            categories={categories}
            setEditingCategoryId={setEditingCategoryId}
            setEditingCategory={setEditingCategory}
            deleteCategory={deleteCategory}
          />
            <button onClick={() => setShowAddCategoryForm(true)} className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded focus:outline-none focus:shadow-outline">
              Add Category
            </button>
          </div>
          {showAddCategoryForm && (
            <CategoryForm onSave={handleAddCategory} />
          )}
          {editingCategory && (
            <EditCategoryForm
              category={editingCategory}
              onSave={handleSaveCategory}
              onCancel={() => {
                setEditingCategoryId(null);
                setEditingCategory(null);
              }}
              onDelete={deleteCategory}
            />
          )}
        </div>
      </div>
      <div className="mt-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-bold mb-4">Item List</h2>
          <ItemList
            key={items.length}
            items={items}
            categories={categories}
            deleteItem={deleteItem}
            setEditingItemId={setEditingItemId}
          />
        </div>
      </div>
      {editingItemId && (
        <EditItemForm
          item={items.find(item => item._id === editingItemId)}
          onSave={handleSaveChanges}
          onCancel={() => setEditingItemId(null)}
        />
      )}
    </div>
  );
}
