import React, { useState } from 'react';
import { Col, Form, Button } from 'react-bootstrap';

const ContactForm = () => {
  // State to hold form data and errors
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    yourMessage: '',
  });

  const [errors, setErrors] = useState({});

  // Handle input changes
  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value.trim(),
    }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    clearErrors();

    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    alert("Form submitted successfully!");
    // Reset the form
    setFormData({
      name: '',
      email: '',
      phone: '',
      subject: '',
      yourMessage: '',
    });
  };

  // Clear error messages
  const clearErrors = () => {
    setErrors({});
  };

  // Validate form fields
  const validateForm = () => {
    const newErrors = {};

    if (!formData.name) {
      newErrors.nameError = 'Name is required.';
    } else if (/\d/.test(formData.name)) {
      newErrors.nameError = 'Name should not contain numbers.';
    }

    if (!formData.email) {
      newErrors.emailError = 'Email is required.';
    } else if (!validateEmail(formData.email)) {
      newErrors.emailError = 'Invalid email format.';
    }

    if (!formData.phone) {
      newErrors.phoneError = 'Phone number is required.';
    } else if (!validatePhone(formData.phone)) {
      newErrors.phoneError = 'Invalid phone number format.';
    }

    if (!formData.subject) {
      newErrors.subjectError = 'Subject is required.';
    }

    if (!formData.yourMessage) {
      newErrors.messageError = 'Message is required.';
    }

    return newErrors;
  };

  // Email validation function
  const validateEmail = (email) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  };

  // Phone validation function
  const validatePhone = (phone) => {
    const phonePattern = /^[\d+\-()\s]+$/; // Allow numbers, spaces, and symbols like +, -, ()
    return phonePattern.test(phone);
  };

  return (
    <Col md={6} className="sendEmail">
      <h5>Send Us An Email</h5>
      <p>
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Fuga perferendis voluptas in laudantium
        qui quis sequi, esse reiciendis? Qui eos soluta minima illum vel reiciendis ipsam enim quaerat ipsum
        dignissimos.
      </p>
      <Form id="contactForm" className="row g-3" onSubmit={handleSubmit}>
        <Col md={6}>
          <Form.Control
            type="text"
            id="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
          />
          {errors.nameError && <div className="error-message text-danger">{errors.nameError}</div>}
        </Col>
        <Col md={6}>
          <Form.Control
            type="text"
            id="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
          />
          {errors.emailError && <div className="error-message text-danger">{errors.emailError}</div>}
        </Col>
        <Col md={6}>
          <Form.Control
            type="text"
            id="phone"
            placeholder="Phone"
            value={formData.phone}
            onChange={handleChange}
          />
          {errors.phoneError && <div className="error-message text-danger">{errors.phoneError}</div>}
        </Col>
        <Col md={6}>
          <Form.Control
            type="text"
            id="subject"
            placeholder="Subject"
            value={formData.subject}
            onChange={handleChange}
          />
          {errors.subjectError && <div className="error-message text-danger">{errors.subjectError}</div>}
        </Col>
        <Col md={12}>
          <Form.Control
            as="textarea"
            id="yourMessage"
            rows={8}
            placeholder="Your Message"
            value={formData.yourMessage}
            onChange={handleChange}
          />
          {errors.messageError && <div className="error-message text-danger">{errors.messageError}</div>}
        </Col>
        <Col md={4}>
          <Button type="submit" className="w-100" id="send-btn">
            Send Message
          </Button>
        </Col>
      </Form>
    </Col>
  );
};

export default ContactForm;