
import './OrderDetail.css';
import LineItem from '../LineItem/LineItem';

export default function OrderDetail({ order, handleChangeQty, handleCheckout }) {
  if (!order || !order.lineItems.length) return null;

  const lineItems = order.lineItems.map(lineItem => (
    <LineItem
      lineItem={lineItem}
      isPaid={order.isPaid}
      handleChangeQty={handleChangeQty}
      key={lineItem.item._id}
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
              <div>Total Quantity: {order.orderQty}</div>
              <div>Total Price: ${order.orderTotal.toFixed(2)}</div>
              <button
                className="btn btn-primary btn-lg"
                onClick={handleCheckout}
                disabled={!lineItems.length}
              >SEND TO TRIAGE</button>
            </section>
          </>
        ) : (
          <div className="no-items">No items in the order</div>
        )}
      </div>
    </div>
  );
}
