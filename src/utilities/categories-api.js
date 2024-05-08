import sendRequest from './send-request';
const BASE_URL = '/api/categories';

// Fetch all categories
export async function getAll() {
  return sendRequest(`${BASE_URL}`);
}

// Create a new category
export async function createCategory(category) {
  return sendRequest(BASE_URL, 'POST', category);
}

// Delete a category
export async function deleteCategory(categoryId) {
  try {
    return await sendRequest(`${BASE_URL}/${categoryId}`, 'DELETE');
  } catch (err) {
    console.error('Error deleting category:', err);
    throw err;
  }
}

// Edit a category
export async function editCategory(categoryId, categoryData) {
  return sendRequest(`${BASE_URL}/${categoryId}`, 'PUT', categoryData);
}
