import sendRequest from './send-request';

const BASE_URL = '/api/orders';

export function getAllOrders() {
  return sendRequest(`${BASE_URL}`);
}

export function markOrderAsPrepared(orderId) {
  return sendRequest(`${BASE_URL}/${orderId}/mark-prepared`, 'PUT');
}

export function getCart() {
  return sendRequest(`${BASE_URL}/cart`);
}

export function addItemToCart(itemId) {
  return sendRequest(`${BASE_URL}/cart/items/${itemId}`, 'POST');
}

export function setItemQtyInCart(itemId, newQty) {
  return sendRequest(`${BASE_URL}/cart/qty`, 'PUT', { itemId, newQty });
}

export function checkout() {
  return sendRequest(`${BASE_URL}/cart/checkout`, 'POST');
}

export function getUnpreparedOrders() {
  return sendRequest(`${BASE_URL}/unprepared`);
}

  export function triage() {
    return sendRequest(`${BASE_URL}/cart/triage`, 'POST');
  }

  export function getUnpaidOrders() {
    return sendRequest(`${BASE_URL}/unpaid`);
  }

  export function markOrderAsPaid(orderId) {
    return sendRequest(`${BASE_URL}/${orderId}/mark-paid`, 'PUT');
  }