import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt, faEdit } from '@fortawesome/free-solid-svg-icons';

export default function ItemListItem({ item, deleteItem, setEditingItemId }) {
  // Ensure that item price is parsed as a number before formatting
  const formattedPrice = item.price ? parseFloat(item.price).toFixed(2) : '';

  return (
    <div className="item-list-item">
      <div className="bg-white rounded shadow-sm overflow-hidden">
        <table className="table table-striped">
          <tbody>
            <tr>
              <td className="px-3 py-2">{item.name}</td>
              <td className="px-3 py-2">{item.description}</td>
              <td className="px-3 py-2">${formattedPrice}</td>
              <td className="px-3 py-2">
                <button onClick={() => deleteItem(item._id)} className="btn btn-danger me-2">
                  <FontAwesomeIcon icon={faTrashAlt} />
                  Delete
                </button>
                <button onClick={() => setEditingItemId(item._id)} className="btn btn-primary">
                  <FontAwesomeIcon icon={faEdit} />
                  Edit
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
