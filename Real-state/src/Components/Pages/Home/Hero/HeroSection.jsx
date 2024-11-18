import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import './HeroSection.css'

const HeroSection = () => {
  return (
    <section className="homepage-hero">
      <Container>
        <Row>
          <Col className="text-center">
            <h1>Find Your Dream Home</h1>
            <h3>From as low as $10 per day with limited time offer discounts.</h3>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default HeroSection;
