import React, { useState, useEffect } from 'react';
import * as ordersAPI from '../../utilities/orders-api';
import CheckoutOrderDetail from '../../components/CheckoutOrderDetail/CheckoutOrderDetail';
import NavBar from '../../components/NavBar/NavBar';
import './CheckoutPage.css';

export default function CheckoutPage({ user }) {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const fetchData = async () => {
    try {
      const fetchedOrders = await ordersAPI.getUnpaidOrders(); 
      fetchedOrders.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      setOrders(fetchedOrders);
      if (fetchedOrders.length > 0) {
        setSelectedOrder(fetchedOrders[0]);
      }
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleOrderSelect = (order) => {
    setSelectedOrder(order);
  };

  const handleCheckout = async (orderId) => {
    try {
      await ordersAPI.markOrderAsPaid(orderId);
      const updatedOrders = await ordersAPI.getUnpaidOrders();
      if (updatedOrders.length > 0) {
        updatedOrders.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        setOrders(updatedOrders);
        setSelectedOrder(updatedOrders[0]);
      } else {
   
        setSelectedOrder(null);
      }
    } catch (error) {
      console.error('Error marking order as paid:', error);
    }
  };
  

  return (
    <div className="CheckoutPage">
      <NavBar />
      <ul className="nav nav-tabs">
        {orders.map((order) => (
          <li key={order._id} className="nav-item">
            <a
              className={`nav-link ${selectedOrder === order ? 'active' : ''}`}
              onClick={() => handleOrderSelect(order)}
            >
              {new Date(order.createdAt).toLocaleTimeString([], { hour: 'numeric', minute: 'numeric' })}
            </a>
          </li>
        ))}
      </ul>
      <div className="order-details-container">
        {selectedOrder && (
          <CheckoutOrderDetail order={selectedOrder} handleCheckout={() => handleCheckout(selectedOrder._id)} />
        )}
      </div>
    </div>
  );
}
