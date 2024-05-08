import './CategoryListForOrder.css'; 

export default function CategoryListForOrder({ categories, activeCat, setActiveCat }) {
  const cats = categories.map(cat => (
    <li className="nav-item" key={cat}>
      <a
        className={`nav-link ${cat === activeCat ? 'active' : ''}`}
        onClick={() => setActiveCat(cat)}
        href="#"
      >
        {cat}
      </a>
    </li>
  ));

  return (
    <ul className="nav nav-tabs CategoryListForOrder">
      {cats}
    </ul>
  );
}
