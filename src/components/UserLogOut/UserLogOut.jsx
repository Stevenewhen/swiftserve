import './UserLogOut.css';
import { logOut } from '../../utilities/users-service';

export default function UserLogOut({ user, setUser }) {
  function handleLogOut() {
    logOut();
    setUser(null);
  }

  // Guard clause to ensure user is defined
  if (!user) {
    return <div>Please log in.</div>;
  }

  return (
    <div className="UserLogOut">
      <div>{user.name}</div> // Now safe to access since user exists
      <div className="email">{user.email}</div>
      <button className="btn-sm" onClick={handleLogOut}>LOG OUT</button>
    </div>
  );
}
