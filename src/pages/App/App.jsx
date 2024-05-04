import { Routes, Route } from 'react-router-dom';
import AuthPage from '../AuthPage/AuthPage';
import ItemsPage from '../ItemsPage/ItemsPage'; // Import ItemsPage instead of NotesPage
import { getUser, logOut } from '../../utilities/users-service';
import { useState } from 'react';
import NavBar from '../../components/NavBar/NavBar'


export default function App() {
  const [user, setUser] = useState(getUser());

  const handleLogout = () => {
     logOut();
     setUser(null);
  };

  return (
     <main className="App">
        {user ? (
           <>
           <NavBar />
              <button onClick={handleLogout}>Log Out</button>
              <Routes>
                 <Route path="/" element={<ItemsPage user={user} setUser={setUser} />} /> {/* Switch to ItemsPage */}
                 {/* Add other routes here if needed */}
              </Routes>
           </>
        ) : (
           <AuthPage setUser={setUser} />
        )}
     </main>
  );
}

