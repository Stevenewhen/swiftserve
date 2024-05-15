import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt, faEdit } from '@fortawesome/free-solid-svg-icons';

export default function ItemList({ items, deleteItem, setEditingItemId, categories }) {
  return (
    <div className="container my-5">
      <div className="card shadow-sm">
        <table className="table">
          <thead>
            <tr>
              <th style={{ width: '5%' }}>#</th>
              <th style={{ width: '5%' }}>Image</th>
              <th style={{ width: '25%' }}>Item</th>
              <th style={{ width: '25%' }}>Category</th>
              <th style={{ width: '20%' }}>Price</th>
              <th style={{ width: '10%' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, index) => (
              <tr key={item._id}>
                <td>{index + 1}</td>
                <td>
                  <img src={item.imgLink} alt={item.name} style={{ maxWidth: '50px' }} />
                </td>
                <td>{item.name}</td>
                <td>{item.category ? item.category.name : 'Uncategorized'}</td>
                <td>${item.price}</td>
                <td>
                  <button onClick={() => deleteItem(item._id)} className="btn btn-danger mr-2">
                    <FontAwesomeIcon icon={faTrashAlt} />
                  </button>
                  <button onClick={() => setEditingItemId(item._id)} className="btn btn-primary">
                    <FontAwesomeIcon icon={faEdit} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}