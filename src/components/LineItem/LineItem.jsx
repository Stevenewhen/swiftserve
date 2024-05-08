import "./LineItem.css"

export default function LineItem({ lineItem, isPaid, handleChangeQty }) {
    return (
      <div className="LineItem">
        <div className="qty" style={{ justifyContent: isPaid && 'center' }}>
          {!isPaid &&
            <button
              className="btn-s"
              onClick={() => handleChangeQty(lineItem.item._id, lineItem.qty - 1)}
            >−</button>
          }
          <span>{lineItem.qty}</span>
          {!isPaid &&
            <button
              className="btn-s"
              onClick={() => handleChangeQty(lineItem.item._id, lineItem.qty + 1)}
            >+</button>
          }
        </div>
          <span className="align-ctr">{lineItem.item.name}</span>
        <div className="ext-price">${lineItem.extPrice.toFixed(2)}</div>
      </div>
    );
  }