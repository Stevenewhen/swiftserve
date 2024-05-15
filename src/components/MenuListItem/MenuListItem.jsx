import './MenuListItem.css';

export default function MenuListItem({ menuItem, handleAddToOrder }) {
  return (
    <div className="card" style={{ width: '20rem' }}>
  {menuItem.imgLink && (
    <img 
    src={menuItem.imgLink} 
    alt={menuItem.name} 
    className="card-img-top"
    style={{ width: '300px', height: '337px', objectFit: 'cover' }}
  />
  
  )}
  <div className="card-body">
    <h5 className="card-title">{menuItem.name}</h5>
    <p className="card-text">${menuItem.price.toFixed(2)}</p>
    <button className="btn btn-primary btn-lg" onClick={() => handleAddToOrder(menuItem._id)}>
      Add
    </button>
  </div>
</div>

  );
}
