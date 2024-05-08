import React, { useState, useEffect } from 'react';
import * as ordersAPI from '../../utilities/orders-api';
import TriageOrderDetail from '../../components/TriageOrderDetail/TriageOrderDetail';
import './TriagePage.css';

export default function TriagePage({ user }) {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  
  const fetchData = async () => {
    try {
      const fetchedOrders = await ordersAPI.getUnpreparedOrders();
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

  const handleMarkAsPrepared = async (orderId) => {
    try {
      await ordersAPI.markOrderAsPrepared(orderId);
      const updatedOrders = await ordersAPI.getUnpreparedOrders();
      if (updatedOrders.length > 0) {
        updatedOrders.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        setOrders(updatedOrders);
        setSelectedOrder(updatedOrders[0]);
      } else {
        // If there are no orders left, reset selectedOrder to null
        setSelectedOrder(null);
      }
    } catch (error) {
      console.error('Error marking order as prepared:', error);
    }
  };
  
  

  const handleTabClick = (order) => {
    setSelectedOrder(order);
  };

  return (
    <div className="TriagePage">
      <ul className="nav nav-tabs">
        {orders.map((order) => (
          <li key={order._id} className="nav-item">
            <a
              className={`nav-link ${selectedOrder === order ? 'active' : ''}`}
              onClick={() => handleTabClick(order)}
            >
              {new Date(order.createdAt).toLocaleTimeString([], { hour: 'numeric', minute: 'numeric' })}
            </a>
          </li>
        ))}
      </ul>
      <div className="order-details-container">
        {selectedOrder && (
          <TriageOrderDetail order={selectedOrder} handleMarkAsPrepared={handleMarkAsPrepared} />
        )}
      </div>
    </div>
  );
}
