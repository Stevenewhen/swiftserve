import React from 'react';
import './CheckoutOrderDetail.css';
import LineItem from '../LineItem/LineItem';

export default function CheckoutOrderDetail({ order, handleCheckout }) {
  if (!order || !order.lineItems.length) return null;

  const lineItems = order.lineItems.map(item => (
    <LineItem
      lineItem={item}
      key={item._id}
    />
  ));

  const total = order.lineItems.reduce((acc, item) => acc + item.extPrice, 0);
  const totalTax = total * 0.0445;

  return (
    <div className="CheckoutOrderDetail">
      <div className="details">
        <div className="section-heading">
          <span className="white">ORDER RECEIPT</span>
          <span className="white">{new Date(order.updatedAt).toLocaleDateString()}</span>
        </div>
        <div className="line-item-container">
          {lineItems}
          <section className="total">
            <div className="line-item">
              <span className="left">Total:</span>
              <span className="right">${total.toFixed(2)}</span>
            </div>
            <div className="line-item">
              <span className="left">Tax:</span>
              <span className="right">${totalTax.toFixed(2)}</span>
            </div>
            <div className="line-item">
              <span className="left">Grand Total:</span>
              <span className="right">${(total + totalTax).toFixed(2)}</span>
            </div>
            <button
              className="btn-checkout"
              onClick={handleCheckout}
            >
              CHECKOUT
            </button>
          </section>
        </div>
      </div>
    </div>
  );
}
