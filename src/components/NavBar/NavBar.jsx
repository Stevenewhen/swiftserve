import { Link } from 'react-router-dom';
import * as userService from '../../utilities/users-service';
import './NavBar.css';

export default function NavBar({ user, setUser }) {
  function handleLogOut() {
    userService.logOut();
    setUser(null);
  }

  return (
    <nav className="navbar border-b">
      <ul className="nav-list flex">
        <li className="nav-item -mb-px mr-1">
          <Link className="nav-link active" to="/add-menu-item">Add Menu Item</Link>
        </li>
        <li className="nav-item mr-1">
          <Link className="nav-link" to="/add-category">Add Category</Link>
        </li>
        <li className="nav-item mr-1">
          <Link className="nav-link" to="/triage">Triage</Link>
        </li>
        {user && (
          <li className="nav-item user-greeting">
            Hello, {user.name}!
          </li>
        )}
        <li className="nav-item mr-1">
          <Link className="nav-link" to="" onClick={handleLogOut}>Logout</Link>
        </li>
      </ul>
    </nav>
  );
}
