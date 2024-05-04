import { Component } from 'react';
import { signUp } from '../../utilities/users-service';

export default class SignUpForm extends Component {
  state = {
    name: '',
    email: '',
    password: '',
    confirm: '',
    error: '',
    isAdmin: false, // New field to track if the user is an admin
  };

  handleChange = (evt) => {
    const { name, value, type, checked } = evt.target;

    this.setState({
      [name]: type === 'checkbox' ? checked : value, // Handle checkboxes differently
      error: ''
    });
  };

  handleSubmit = async (evt) => {
    evt.preventDefault();
    try {
      const {name, email, password, isAdmin} = this.state;
      const formData = {name, email, password, isAdmin}; // Include the new field

      const user = await signUp(formData);
      this.props.setUser(user);
    } catch {
      this.setState({ error: 'Sign Up Failed - Try Again' });
    }
  };

  render() {
    const disable = this.state.password !== this.state.confirm;
    return (
      <div>
        <div className="form-container">
          <form autoComplete="off" onSubmit={this.handleSubmit}>
            <label>Name</label>
            <input type="text" name="name" value={this.state.name} onChange={this.handleChange} required />
            <label>Email</label>
            <input type="email" name="email" value={this.state.email} onChange={this.handleChange} required />
            <label>Password</label>
            <input type="password" name="password" value={this.state.password} onChange={this.handleChange} required />
            <label>Confirm</label>
            <input type="password" name="confirm" value={this.state.confirm} onChange={this.handleChange} required />

            {/* New checkbox for isAdmin */}
            <label>Admin</label>
            <input type="checkbox" name="isAdmin" checked={this.state.isAdmin} onChange={this.handleChange} />

            <button type="submit" disabled={disable}>SIGN UP</button>
          </form>
        </div>
        <p className="error-message">&nbsp;{this.state.error}</p>
      </div>
    );
  }
}
