import { useState } from 'react';
import { Link } from 'react-router-dom';
import * as usersService from '../../utilities/users-service';
import logo from "../../../src/images/SwiftServeLogo.png";
import './LoginForm.css';

export default function LoginForm({ setUser }) {
  const [credentials, setCredentials] = useState({
    email: '',
    password: ''
  });

  function handleChange(evt) {
    setCredentials({ ...credentials, [evt.target.name]: evt.target.value });
  }

  async function handleSubmit(evt) {
    evt.preventDefault();
    try {
      const user = await usersService.login(credentials);
      setUser(user);
    } catch {
      console.error('Login failed');
    }
  }

  return (
    <section className="vh-100" style={{ backgroundColor: 'white' }}>
      <div className="container py-5 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col col-xl-10">
            <div className="card" style={{ borderRadius: '1rem' }}>
              <div className="row g-0">
                <div className="col-md-6 col-lg-5 d-none d-md-block">
                  <img src="https://i.imgur.com/FFePVXR.png"
                    alt="login form" className="img-fluid" style={{ borderRadius: '1rem 0 0 1rem' }} />
                </div>
                <div className="col-md-6 col-lg-7 d-flex align-items-center">
                  <div className="card-body p-4 p-lg-5 text-black">

                    <form onSubmit={handleSubmit}>
                      <div className="LogoLogin">
                        <span className="h1 fw-bold mb-0">
                          <img src={logo} alt="" style={{ width: '100px'}} />SwiftServ
                        </span>
                      </div>

                      <h5 className="fw-normal mb-3 pb-3" style={{ letterSpacing: '1px' }}>Sign into your account</h5>

                      <div className="input-group mb-3">
                        <span className="input-group-text" id="basic-addon1">@</span>
                        <input type="email" className="form-control form-control-lg" placeholder="Email address" aria-label="Email address" aria-describedby="basic-addon1" name="email" value={credentials.email} onChange={handleChange} />
                      </div>

                      <div className="input-group mb-3">
                        <span className="input-group-text" id="basic-addon2">Password</span>
                        <input type="password" className="form-control form-control-lg" placeholder="Password" aria-label="Password" aria-describedby="basic-addon2" name="password" value={credentials.password} onChange={handleChange} />
                      </div>

                      <div className="pt-1 mb-4">
                        <button type="submit" className="btn btn-dark btn-lg btn-block">Login</button>
                      </div>

                      <a className="small text-muted" href="#!">Forgot password?</a>
                      <p className="mb-5 pb-lg-2" style={{ color: '#393f81' }}>Don't have an account? <Link to="/register" style={{ color: '#393f81' }}>Register here</Link></p>
                      <a href="#!" className="small text-muted">Terms of use.</a>
                      <a href="#!" className="small text-muted">Privacy policy</a>
                    </form>
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
