import React, { useEffect, useState } from 'react';
import { Navbar, Nav, Button, Dropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import '@fortawesome/fontawesome-free/css/all.min.css';
import './general.css';
import logo from '../../assets/logo-2.png';

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [navbarHeight, setNavbarHeight] = useState(0);

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token); // Set to true if token exists
  }, []);

  useEffect(() => {
    // Calculate and set navbar height
    const navbar = document.querySelector('.navbar');
    if (navbar) {
      setNavbarHeight(navbar.offsetHeight);
    }

    // Recalculate navbar height on window resize
    const handleResize = () => {
      if (navbar) {
        setNavbarHeight(navbar.offsetHeight);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
  };

  return (
    <>
      <Navbar expand="lg" className="navbar fixed-top" style={{ backgroundColor: 'white' }}>
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            <img id="brand-logo" src={logo} alt="FindHouse Logo" />
          </Link>
          <Navbar.Toggle aria-controls="navbarNav" />
          <Navbar.Collapse id="navbarNav">
            <Nav className="me-auto">
              <Link className="nav-link" to="/">Home</Link>
              <Link className="nav-link" to="/Properties">Property</Link>
              <Link className="nav-link" to="/Services">Services</Link>
              <Link className="nav-link" to="/Blog">Blog</Link>
              <Link className="nav-link" to="/About">About Us</Link>
              <Link className="nav-link" to="/Contact">Contact Us</Link>
            </Nav>
            <Nav className="ms-auto">
              {isLoggedIn ? (
                <Dropdown align="end">
                  <Dropdown.Toggle variant="white" id="profile-btn" className="d-flex align-items-center border-0">
                    <i className="fa-solid fa-user-circle" style={{ fontSize: '1.5em', color: '#333' }}></i>
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item as={Link} to="/profile">
                      <i className="fa-solid fa-user me-2"></i> My Profile
                    </Dropdown.Item>
                    <Dropdown.Divider />
                    <Dropdown.Item onClick={handleLogout}>
                      <i className="fa-solid fa-right-from-bracket me-2"></i> Logout
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              ) : (
                <Link to="/Register">
                  <Button variant="danger" id="register-btn">+ Register</Button>
                </Link>
              )}
            </Nav>
          </Navbar.Collapse>
        </div>
      </Navbar>

      {/* Main content wrapper with dynamic padding */}
      <div style={{ paddingTop: `${navbarHeight}px` }}>
        {/* Insert your main content here */}
      </div>
    </>
  );
};

export default Header;
