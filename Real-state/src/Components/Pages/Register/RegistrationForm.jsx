import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './register.css';

function RegisterForm() {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        password: '',
        confirmPassword: '',
        agreeTerms: false,
        role: 'client', // default role
    });
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        clearFormFields();
    }, []);

    const handleChange = (e) => {
        const { id, value, checked } = e.target;
        setFormData({
            ...formData,
            [id]: id === 'agreeTerms' ? checked : value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        clearErrors();
        const newErrors = validateForm();
        if (Object.keys(newErrors).length === 0) {
            try {
                const response = await fetch('http://localhost:3001/api/users/register', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        ...formData,
                        termsAccepted: formData.agreeTerms
                    }),
                });

                const data = await response.json();

                if (response.ok) {
                    // Display success toast and redirect to login
                    toast.success('User registered successfully! Redirecting to login...', {
                        onClose: () => navigate('/login'), // Redirect after toast closes
                        autoClose: 2000 // Close the toast after 2 seconds
                    });
                    clearFormFields();
                } else {
                    // Display backend error message in toast if registration fails
                    toast.error(data.message || 'Registration failed');
                }
            } catch (error) {
                console.error('Error:', error);
                toast.error('Server error, please try again later');
            }
        } else {
            setErrors(newErrors);
        }
    };

    const validateForm = () => {
        const validationErrors = {};
        if (!formData.firstName) {
            validationErrors.firstName = 'First name is required.';
        } else if (/\d/.test(formData.firstName)) {
            validationErrors.firstName = 'First name should not contain numbers.';
        }

        if (!formData.lastName) {
            validationErrors.lastName = 'Last name is required.';
        } else if (/\d/.test(formData.lastName)) {
            validationErrors.lastName = 'Last name should not contain numbers.';
        }

        if (!formData.email) {
            validationErrors.email = 'Email is required.';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            validationErrors.email = 'Invalid email address.';
        }

        if (!formData.phone) {
            validationErrors.phone = 'Phone number is required.';
        } else if (!/^[\d\+\-\(\)\s]+$/.test(formData.phone)) {
            validationErrors.phone = 'Invalid phone number.';
        }

        if (!formData.password) {
            validationErrors.password = 'Password is required.';
        } else if (formData.password.length < 8) {
            validationErrors.password = 'Password must be at least 8 characters long.';
        }

        if (!formData.confirmPassword) {
            validationErrors.confirmPassword = 'Please confirm your password.';
        } else if (formData.password !== formData.confirmPassword) {
            validationErrors.confirmPassword = 'Passwords must match.';
        }

        if (!formData.agreeTerms) {
            validationErrors.agreeTerms = 'You must agree to the terms and conditions.';
        }

        return validationErrors;
    };

    const clearErrors = () => {
        setErrors({});
    };

    const clearFormFields = () => {
        setFormData({
            firstName: '',
            lastName: '',
            email: '',
            phone: '',
            password: '',
            confirmPassword: '',
            agreeTerms: false,
            role: 'client',
        });
    };

    return (
        <Container fluid>
            <ToastContainer /> {/* Toastify container for displaying toasts */}
            <Row className="justify-content-center m-4">
                <Col className="reg-form-wrapper bg-white p-4">
                    <h4 className="reg-form-header text-center">Register</h4>
                    <Form onSubmit={handleSubmit} id="registrationForm">
                        <Row className="g-3">
                            <Col md={6}>
                                <Form.Group controlId="firstName">
                                    <Form.Label>First Name</Form.Label>
                                    <Form.Control
                                        type="text"
                                        value={formData.firstName}
                                        onChange={handleChange}
                                        className="reg-form-control"
                                    />
                                    {errors.firstName && <small className="text-danger">{errors.firstName}</small>}
                                </Form.Group>
                            </Col>
                            <Col md={6}>
                                <Form.Group controlId="lastName">
                                    <Form.Label>Last Name</Form.Label>
                                    <Form.Control
                                        type="text"
                                        value={formData.lastName}
                                        onChange={handleChange}
                                        className="reg-form-control"
                                    />
                                    {errors.lastName && <small className="text-danger">{errors.lastName}</small>}
                                </Form.Group>
                            </Col>
                        </Row>

                        <Form.Group controlId="email" className="mt-3">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type="email"
                                value={formData.email}
                                onChange={handleChange}
                                className="reg-form-control"
                            />
                            {errors.email && <small className="text-danger">{errors.email}</small>}
                        </Form.Group>

                        <Form.Group controlId="phone" className="mt-3">
                            <Form.Label>Phone</Form.Label>
                            <Form.Control
                                type="text"
                                value={formData.phone}
                                onChange={handleChange}
                                className="reg-form-control"
                            />
                            {errors.phone && <small className="text-danger">{errors.phone}</small>}
                        </Form.Group>

                        <Form.Group controlId="password" className="mt-3">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type="password"
                                value={formData.password}
                                onChange={handleChange}
                                className="reg-form-control"
                            />
                            {errors.password && <small className="text-danger">{errors.password}</small>}
                        </Form.Group>

                        <Form.Group controlId="confirmPassword" className="mt-3">
                            <Form.Label>Confirm Password</Form.Label>
                            <Form.Control
                                type="password"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                className="reg-form-control"
                            />
                            {errors.confirmPassword && <small className="text-danger">{errors.confirmPassword}</small>}
                        </Form.Group>

                        <Form.Group controlId="role" className="mt-3">
                            <Form.Label>Role</Form.Label>
                            <Form.Select value={formData.role} onChange={handleChange}>
                                <option value="client">Client</option>
                                <option value="agent">Agent</option>
                                <option value="admin">Admin</option>
                            </Form.Select>
                        </Form.Group>

                        <Form.Group controlId="agreeTerms" className="mt-3">
                            <Form.Check
                                type="checkbox"
                                label={<span>I agree to all the <a href="#terms">Terms</a> and <a href="#privacy">Privacy Policy</a></span>}
                                checked={formData.agreeTerms}
                                onChange={handleChange}
                                className="reg-form-check"
                            />
                            {errors.agreeTerms && <small className="text-danger">{errors.agreeTerms}</small>}
                        </Form.Group>

                        <div className="d-flex justify-content-center mt-4">
                            <Button type="submit" id="createAccount" className="w-100">
                                Create Account
                            </Button>
                        </div>

                        <p className="text-center mt-3" id="log-in-prompt">
                            Already have an account? <Link to="/Login">Log in</Link>
                        </p>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
}

export default RegisterForm;
