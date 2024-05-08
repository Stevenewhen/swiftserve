import React from 'react';
import './TriageOrderDetail.css';

export default function TriageOrderDetail({ order, handleMarkAsPrepared }) {
  const formatTime = (date) => {
    const options = { hour: 'numeric', minute: 'numeric' };
    return new Date(date).toLocaleTimeString([], options);
  };

  return (
    <div className="order-card">
      <div className="details">
        <table className="order-table">
          <thead>
            <tr>
              <th>Time</th>
              <th>Table</th>
              <th>Guest</th>
              <th>Server</th>
              <th>Ticket #</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><h3>{formatTime(order.createdAt)}</h3></td>
              <td></td>
              <td></td>
              <td></td>
              <td><span className="large-red-bold">{order.ordernum}</span></td>
            </tr>
          </tbody>
        </table>
        <div className="line-item-container">
          {order.lineItems.length ? (
            <>
              {order.lineItems.map((item, idx) => (
                <div key={idx} className="line-item">
                  <p className="item">{item.item.name}</p>
                  <p className="quantity">x {item.qty}</p>
                </div>
              ))}
              <button
                className="btn-mark-prepared"
                onClick={() => handleMarkAsPrepared(order._id)}
                disabled={order.isPrepared}
              >
                Mark as Prepared
              </button>
            </>
          ) : (
            <div className="no-items">No items in this order.</div>
          )}
        </div>
      </div>
    </div>
  );
}
