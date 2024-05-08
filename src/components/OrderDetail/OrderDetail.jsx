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
                <>
                  <span className="right">TOTAL&nbsp;&nbsp;</span>
                  <span className="right">${order.orderTotal.toFixed(2)}</span>
                </>
                <button
                  className="btn-sm"
                  onClick={handleCheckout}
                  disabled={!lineItems.length}
                >SEND TO TRIAGE</button>
              <span>{order.totalQty}</span>
            </section>
          </>
        ) : (
          <div className="no-items">No items in the order</div>
        )}
      </div>
    </div>
  );
}
