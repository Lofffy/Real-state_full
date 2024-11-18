import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';

const HeroSection = () => {
    return (
        <section className="about-hero">
            <Container className="d-flex align-items-center">
                <Row>
                    <Col>
                        <h6>
                            <Link to="#">Home</Link> / <Link to="#">About</Link>
                        </h6>
                        <h1>About Us</h1>
                    </Col>
                </Row>
            </Container>
        </section>
    );
};

export default HeroSection;