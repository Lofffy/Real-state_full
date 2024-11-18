import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar } from 'react-bootstrap';

import logo from '../../assets/logo-2.png'

const AltNavBar = () => {
    return (
        <Navbar className="bg-white d-flex justify-content-center">
            <Navbar.Brand as={Link} to="/">
                <img src={logo} alt="Logo" width="225" />
            </Navbar.Brand>
        </Navbar>
    );
};

export default AltNavBar;
