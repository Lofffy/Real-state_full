import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';

const HeroSection = () => {
    return (
        <section className="contact-hero">
            <Container className="d-flex align-items-center">
                <Row>
                    <Col>
                        <h6>
                            <Link to="#">Home</Link> / <Link to="#">Contact</Link>
                        </h6>
                        <h1>Contact Us</h1>
                    </Col>
                </Row>
            </Container>
        </section>
    );
};

export default HeroSection;