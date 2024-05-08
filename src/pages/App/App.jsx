import { Routes, Route, Navigate } from 'react-router-dom';
import AuthPage from '../AuthPage/AuthPage';
import RegisterPage from '../RegisterPage/RegisterPage';
import ItemsPage from '../ItemsPage/ItemsPage';
import { getUser, logOut } from '../../utilities/users-service';
import { useState } from 'react';
import AddOrderForm from '../../components/AddOrderForm/AddOrderForm';
import NewOrderPage from '../NewOrderPage/NewOrderPage';
import TriagePage from '../TriagePage/TriagePage';
import CheckoutPage from '../CheckoutPage/CheckoutPage';

export default function App() {
   const [user, setUser] = useState(getUser());
 
   return (
     <main className="App">
       <Routes>
         {user ? (
           <>
             <Route path="/triage" element={<TriagePage user={user} setUser={setUser} />} />
             <Route path="/orders/new" element={<NewOrderPage user={user} setUser={setUser} />} />
             <Route path="/" element={<ItemsPage user={user} setUser={setUser} />} />
             <Route path="/add-order" element={<AddOrderForm />} />
             <Route path="/checkout" element={<CheckoutPage />} />
           </>
         ) : (
           <>
             {/* Routes accessible when no user is logged in */}
             <Route path="/login" element={<AuthPage setUser={setUser} />} />
             <Route path="/register" element={<RegisterPage setUser={setUser} />} />
           </>
         )}
         {/* Route that should be accessible always */}
         <Route path="*" element={<Navigate to={user ? "/" : "/login"} />} />
       </Routes>
     </main>
   );
 }
 