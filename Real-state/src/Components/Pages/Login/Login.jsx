import React from 'react';
import Footer from '../../Shared/Footer';
import './login.css';
import AltNavBar from '../../Shared/AltNavBar';
import LoginForm from './LoginForm';

const Login = () => {
    return (
        <div>
            <AltNavBar />
            <LoginForm />
            <Footer />
        </div>
    );
};

export default Login;