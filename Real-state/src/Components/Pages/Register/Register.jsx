import React from 'react';
import Footer from '../../Shared/Footer';
import './register.css';
import RegistrationForm from './RegistrationForm';
import AltNavBar from '../../Shared/AltNavBar';

const Register = () => {
    return (
        <div>
            <AltNavBar />
            <RegistrationForm />
            <Footer />
        </div>
    );
};

export default Register;