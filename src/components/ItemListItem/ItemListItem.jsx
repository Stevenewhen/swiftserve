import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; // Import FontAwesomeIcon component
import { faTrashAlt, faEdit } from '@fortawesome/free-solid-svg-icons'; // Import FontAwesome icons

export default function ItemListItem({ item, deleteItem, setEditingItemId }) {
  return (
    <div className="item-list-item">
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <table className="table-auto w-full">
          <tbody>
            <tr key={item._id} className="border-b border-gray-200 hover:bg-gray-100">
              <td className="px-4 py-2">{item.name}</td>
              <td className="px-4 py-2">{item.description}</td>
              {/* Render category here */}
              <td className="px-4 py-2">{/* Render category name here */}</td>
              <td className="px-4 py-2">${item.price}</td>
              <td className="px-4 py-2">
                <button onClick={() => deleteItem(item._id)} className="text-white-500 hover:text-red-500 focus:outline-none">
                  <FontAwesomeIcon icon={faTrashAlt} className="inline-block align-middle" /> {/* FontAwesome trash icon */}
                </button>
                <button onClick={() => setEditingItemId(item._id)} className="ml-2 text-white hover:text-blue-700 focus:outline-none">
                  <FontAwesomeIcon icon={faEdit} className="inline-block align-middle" /> {/* FontAwesome edit icon */}
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
