import LoginForm from '../../components/LoginForm/LoginForm';
import './AuthPage.css';

export default function AuthPage({ setUser }) {
  return (
    <main className="AuthPage">
 <LoginForm setUser={setUser} />
    </main>
  );
}
