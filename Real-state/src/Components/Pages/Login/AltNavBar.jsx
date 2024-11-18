import React from 'react';
import { Navbar } from 'react-bootstrap';

import logo from '../../../assets/logo-2.png'

const AltNavBar = () => {
    return (
        <Navbar className="bg-white">
            <Navbar.Brand href="#">
                <img src={logo} alt="Logo" width="225" />
            </Navbar.Brand>
        </Navbar>
    );
};

export default AltNavBar;
