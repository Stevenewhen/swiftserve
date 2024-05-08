// RegisterPage.js
import SignUpForm from '../../components/SignUpForm/SignUpForm';
import './RegisterPage.css';

export default function RegisterPage({ setUser }) {
  return (
    <main className="RegisterPage">
      <SignUpForm setUser={setUser} />
    </main>
  );
}
