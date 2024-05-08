import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import logo from "../../../src/images/SwiftServeLogo.png";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUtensils, faClipboardList, faPlus, faUser, faSignOutAlt, faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { logOut } from '../../utilities/users-service';

export default function NavBar({ user, setUser }) {
  function handleLogOut() {
    logOut();
    setUser(null);
  }

  return (
    <Navbar expand="lg" className="navbar navbar-expand-lg" style={{ backgroundColor: '#f7c272' }}>
      <Navbar.Brand as={Link} to="/" className="navbar-brand" style={{ color: 'white', fontSize: '2rem', fontFamily: 'Josefin Sans, sans-serif', fontWeight: '900' }}>
        <img src={logo} alt="SwiftServ Logo" style={{ height: '50px' }} /><span className="josefin-sans">SwiftServ</span>
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" className="navbar-toggler" />
      <Navbar.Collapse id="basic-navbar-nav" className="collapse navbar-collapse">
        <Nav className="ml-auto navbar-nav">
          {user && (
            <Nav.Link className="nav-link" style={{ color: 'white', textDecoration: 'none', fontWeight: 900 }}>
              <FontAwesomeIcon icon={faUser} /> Hello, {user.name}!
            </Nav.Link>
          )}
          <Nav.Link as={Link} to="/orders/new" className="nav-link" style={{ color: 'white', textDecoration: 'none', fontWeight: 900 }}>
            <FontAwesomeIcon icon={faPlus} /> New Order
          </Nav.Link>
          <Nav.Link as={Link} to="/triage" className="nav-link" style={{ color: 'white', textDecoration: 'none', fontWeight: 900 }}>
            <FontAwesomeIcon icon={faClipboardList} /> Triage
          </Nav.Link>
          <Nav.Link as={Link} to="/" className="nav-link" style={{ color: 'white', textDecoration: 'none', fontWeight: 900 }}>
            <FontAwesomeIcon icon={faUtensils} /> Add Menu Item
          </Nav.Link>
          <Nav.Link as={Link} to="/checkout" className="nav-link" style={{ color: 'white', textDecoration: 'none', fontWeight: 900 }}>
            <FontAwesomeIcon icon={faShoppingCart} /> Checkout
          </Nav.Link>
          <Nav.Link
            onClick={() => {
              if (window.confirm("Are you sure you want to logout?")) {
                handleLogOut();
              }
            }}
            className="nav-link"
            style={{ color: 'white', textDecoration: 'none', fontWeight: 900 }}
          >
            <FontAwesomeIcon icon={faSignOutAlt} /> Logout
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}