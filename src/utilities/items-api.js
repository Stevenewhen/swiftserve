import sendRequest from './send-request';
const BASE_URL = '/api/items';

export async function getAll() {
  return sendRequest(`${BASE_URL}`);
}

export async function createItem(item) {
  return sendRequest(BASE_URL, 'POST', item);
}

// Delete an item
export async function deleteItem(itemId) {
  try {
    return await sendRequest(`${BASE_URL}/${itemId}`, 'DELETE');
  } catch (err) {
    console.error('Error deleting item:', err);
    throw err;
  }
}

// Edit an item
export async function editItem(itemId, itemData) {
  return sendRequest(`${BASE_URL}/${itemId}`, 'PUT', itemData); 
}
