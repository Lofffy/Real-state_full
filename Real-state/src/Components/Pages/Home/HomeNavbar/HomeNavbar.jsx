import React, { useEffect, useState } from 'react';
import { Navbar, Nav, Button, Dropdown } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import '@fortawesome/fontawesome-free/css/all.min.css';

import logoDefault from '../../../../assets/logo-3.png';
import logoAlternate from '../../../../assets/logo-4.png';

const HomeNavbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();

  // Check login status on mount
  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token); // Set to true if token exists
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    navigate('/');
  };

  useEffect(() => {
    const handleScroll = () => {
      const navbar = document.querySelector('.navbar');
      const brandLogo = document.getElementById('brand-logo');
      const registerBtn = document.getElementById('register-btn');
      const navLinks = document.querySelectorAll('.nav-link');

      const viewportHeight = window.innerHeight * 0.3;

      // Check if the page is scrolled beyond the viewport height threshold
      if (window.scrollY >= viewportHeight) {
        setIsScrolled(true); // Set to scrolled state
      } else {
        setIsScrolled(false); // Set to transparent state
      }

      if (isScrolled) {
        navbar.style.backgroundColor = 'white';
        brandLogo.src = logoDefault;
        if (registerBtn) {
          registerBtn.style.backgroundColor = '#ff5a5f';
          registerBtn.style.color = 'white';
        }
        navLinks.forEach(link => {
          link.style.color = '#000';
          link.style.transition = 'color 0.3s ease';
        });
      } else {
        navbar.style.backgroundColor = 'transparent';
        brandLogo.src = logoAlternate;
        if (registerBtn) {
          registerBtn.style.backgroundColor = 'white';
          registerBtn.style.color = '#ff5a5f';
        }
        navLinks.forEach(link => {
          link.style.color = 'white';
        });
      }
    };

    // Initial check on component mount
    handleScroll();

    // Add event listener for scroll
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isScrolled]);

  return (
    <Navbar expand="lg" className="navbar justify-content-between fixed-top" id="HomeNavbar">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          <img id="brand-logo" src={isScrolled ? logoDefault : logoAlternate} alt="FindHouse Brand Logo" />
        </Link>
        <Navbar.Toggle aria-controls="navbarNavAltMarkup" />
        <Navbar.Collapse id="navbarNavAltMarkup">
          <Nav className="me-auto">
            <Link className="nav-link active" aria-current="page" to="/">Home</Link>
            <Link className="nav-link" to="/Properties">Property</Link>
            <Link className="nav-link" to="/Services">Services</Link>
            <Link className="nav-link" to="/Blog">Blog</Link>
            <Link className="nav-link" to="/About">About Us</Link>
            <Link className="nav-link" to="/Contact">Contact Us</Link>
          </Nav>
          {isLoggedIn ? (
            <Dropdown align="end">
              <Dropdown.Toggle variant="light" id="profile-btn" className="d-flex align-items-center">
                <i className="fas fa-user-circle"></i> {/* Font Awesome user-circle icon */}
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item as={Link} to="/profile">
                  <i className="fas fa-user me-2"></i> My Profile
                </Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item onClick={handleLogout}>
                  <i className="fas fa-sign-out-alt me-2"></i> Logout
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          ) : (
            <Link to="/Register">
              <Button variant="light" id="register-btn">+ Register</Button>
            </Link>
          )}
        </Navbar.Collapse>
      </div>
    </Navbar>
  );
};

export default HomeNavbar;
