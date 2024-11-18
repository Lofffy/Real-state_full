import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './login.css';

const LoginForm = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        rememberMe: false,
    });
    const [errors, setErrors] = useState({});
    const navigate = useNavigate(); // React Router hook for redirection

    // Handle input changes
    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value,
        });
    };

    // Validate form fields
    const validateForm = () => {
        const validationErrors = {};
        if (!formData.email) {
            validationErrors.email = 'Email is required.';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            validationErrors.email = 'Invalid email address.';
        }

        if (!formData.password) {
            validationErrors.password = 'Password is required.';
        }

        return validationErrors;
    };

    // Handle form submission and validation
    const handleSubmit = async (e) => {
        e.preventDefault();
        clearErrors();
        const newErrors = validateForm();
        if (Object.keys(newErrors).length === 0) {
            try {
                // Make a request to the login API
                const response = await fetch('http://localhost:3001/api/users/login', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ email: formData.email, password: formData.password })
                });

                const data = await response.json();

                if (response.ok) {
                    // Login successful
                    toast.success('Login successful!');
                    // Save token to localStorage (or sessionStorage)
                    localStorage.setItem('token', data.token);
                    // Redirect to dashboard or home page
                    navigate('/'); // Replace with your desired route
                } else {
                    // Display error message from the backend
                    toast.error(data.message || 'Login failed');
                }
            } catch (error) {
                console.error('Error:', error);
                toast.error('Server error, please try again later');
            }
        } else {
            setErrors(newErrors);
        }
    };

    // Clear all form errors
    const clearErrors = () => {
        setErrors({});
    };

    return (
        <Container fluid>
            <ToastContainer /> {/* Toastify container for displaying notifications */}
            <Row className="justify-content-center m-4">
                <Col className="login-form-wrapper bg-white p-4">
                    <h4 className="login-form-header text-center">Login</h4>
                    <Form onSubmit={handleSubmit} id="loginForm">
                        <Form.Group controlId="email" className="mb-3">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                className="login-form-control"
                            />
                            {errors.email && <small className="text-danger">{errors.email}</small>}
                        </Form.Group>

                        <Form.Group controlId="password" className="mb-3">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                className="login-form-control"
                            />
                            {errors.password && <small className="text-danger">{errors.password}</small>}
                        </Form.Group>

                        <Form.Group controlId="rememberMe" className="mb-3">
                            <Form.Check
                                type="checkbox"
                                label="Remember Me"
                                name="rememberMe"
                                checked={formData.rememberMe}
                                onChange={handleChange}
                                className="login-form-check"
                            />
                        </Form.Group>

                        <div className="d-flex justify-content-center mt-4">
                            <Button type="submit" className="btn w-100" id="loginBtn">
                                Login
                            </Button>
                        </div>

                        <p className="text-center mt-3" id="register-prompt">
                            Don't have an account? <Link to="/Register">Register</Link>
                        </p>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
};

export default LoginForm;
