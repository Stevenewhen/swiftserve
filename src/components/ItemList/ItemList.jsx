import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt, faEdit } from '@fortawesome/free-solid-svg-icons';

export default function ItemList({ items, deleteItem, setEditingItemId, categories }) {
   console.log('Items:', items); 
   return (
      <div className="mx-auto max-w-4xl">
         <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <table className="table-auto w-full">
               <thead>
                  <tr className="bg-orange-500 text-white">
                     <th className="w-1/4 px-4 py-2">Item</th>
                     <th className="w-1/4 px-4 py-2">Description</th>
                     <th className="w-1/4 px-4 py-2">Category</th>
                     <th className="w-1/12 px-4 py-2">Price</th>
                     <th className="w-1/6 px-4 py-2">Actions</th>
                  </tr>
               </thead>
               <tbody>
                  {items.map(item => (
                     item._id &&
                     <tr key={item._id} className="border-b border-gray-200 hover:bg-gray-100">
                        <td className="px-4 py-2">{item.name}</td>
                        <td className="px-4 py-2">{item.description}</td>
                        <td className="px-4 py-2">{categories.find(cat => cat._id === item.category)?.name}</td>
                        <td className="px-4 py-2">${item.price}</td>
                        <td className="px-4 py-2">
                           <button onClick={() => deleteItem(item._id)} className="text-white-500 hover:text-red-500 focus:outline-none">
                              <FontAwesomeIcon icon={faTrashAlt} className="inline-block align-middle" />
                           </button>
                           {item._id && (
                              <button onClick={() => setEditingItemId(item._id)} className="ml-2 text-white hover:text-blue-700 focus:outline-none">
                                 <FontAwesomeIcon icon={faEdit} className="inline-block align-middle" />
                              </button>
                           )}
                        </td>
                     </tr>
                  ))}
               </tbody>
            </table>
         </div>
      </div>
   );
}
