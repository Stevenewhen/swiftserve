import { useState } from 'react';
import { Link } from 'react-router-dom';
import { signUp } from '../../utilities/users-service';
import logo from "../../../src/images/SwiftServeLogo.png";
import './SignUpForm.css';

export default function SignUpForm({ setUser }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirm: '',
    isAdmin: false,
  });
  const [error, setError] = useState('');

  const handleChange = (evt) => {
    const { name, value, type, checked } = evt.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    if (formData.password !== formData.confirm) {
      setError('Passwords do not match');
      return;
    }
    try {
      const user = await signUp(formData);
      setUser(user);
    } catch (error) {
      setError('Sign Up Failed - Try Again');
    }
  };

  const { name, email, password, confirm, isAdmin } = formData;
  const disable = password !== confirm;

  return (
    <section className="vh-100" style={{ backgroundColor: 'white' }}>
      <div className="container py-5 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col col-xl-10">
            <div className="card" style={{ borderRadius: '1rem' }}>
              <div className="row g-0">
                <div className="col-md-6 col-lg-5 d-none d-md-block">
                  <img src='https://i.imgur.com/1w4YEFd.png' alt="logo" className="img-fluid" style={{ borderRadius: '1rem 0 0 1rem' }} />
                </div>
                <div className="col-md-6 col-lg-7 d-flex align-items-center">
                  <div className="card-body p-4 p-lg-5 text-black">
                    <form autoComplete="off" onSubmit={handleSubmit}>
                      <div className="LogoLogin">
                        <span className="h1 fw-bold mb-0">
                          <img src={logo} alt="logo" style={{ width: '100px' }} />SwiftServ
                        </span>
                      </div>

                      <h5 className="fw-normal mb-3 pb-3" style={{ letterSpacing: '1px' }}>Sign Up</h5>

                      <div className="mb-3">
                        <label htmlFor="name" className="form-label">Name</label>
                        <input type="text" id="name" name="name" value={name} onChange={handleChange} className="form-control" required />
                      </div>
                      <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email</label>
                        <input type="email" id="email" name="email" value={email} onChange={handleChange} className="form-control" required />
                      </div>
                      <div className="mb-3">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input type="password" id="password" name="password" value={password} onChange={handleChange} className="form-control" required />
                      </div>
                      <div className="mb-3">
                        <label htmlFor="confirm" className="form-label">Confirm Password</label>
                        <input type="password" id="confirm" name="confirm" value={confirm} onChange={handleChange} className="form-control" required />
                      </div>
                      <div className="mb-3 form-check">
                        <input type="checkbox" id="isAdmin" name="isAdmin" checked={isAdmin} onChange={handleChange} className="form-check-input" />
                        <label htmlFor="isAdmin" className="form-check-label">Admin</label>
                      </div>
                      <button type="submit" className="btn btn-dark btn-lg btn-block" disabled={disable}>SIGN UP</button>
                    </form>
                    {error && <p className="error-message">{error}</p>}
                    <p className="login-link">
                      Already have an account? <Link to="/login">Login here</Link>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
