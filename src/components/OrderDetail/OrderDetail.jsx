import React from 'react';
import './OrderDetail.css';
import LineItem from '../LineItem/LineItem';

export default function OrderDetail({ order, handleChangeQty, handleCheckout }) {
  if (!order || !order.lineItems.length) return null;

  const lineItems = order.lineItems.map(item => (
    <LineItem
      lineItem={item}
      isPaid={order.isPaid}
      handleChangeQty={handleChangeQty}
      key={item._id}
    />
  ));

  const formattedTotal = order.orderTotal != null ? `$${order.orderTotal.toFixed(2)}` : '$0.00';

  return (
    <div className="OrderDetail">
      <div className="section-heading">
        <span className="white">NEW ORDER</span>
        <span className="white">{new Date(order.updatedAt).toLocaleDateString()}</span>
      </div>
      <div className="line-item-container flex-ctr-ctr flex-col scroll-y">
        {lineItems.length ? (
          <>
            {lineItems}
            <section className="total">
              <div className="right">TOTAL&nbsp;&nbsp;</div>
              <div className="right">{formattedTotal}</div>
              <button
                className="btn-sm"
                onClick={handleCheckout}
                disabled={!lineItems.length}
              >SEND TO TRIAGE</button>
              <div>Total Quantity: {order.totalQty}</div>
            </section>
          </>
        ) : (
          <div className="no-items">No items in the order</div>
        )}
      </div>
    </div>
  );
}
