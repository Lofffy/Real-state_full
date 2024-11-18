import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';

const CallToAction = () => {
    return (
        <section className="cta-section">
            <Container>
                <Row className="d-flex justify-content-between align-items-center mt-4 mb-4">
                    <Col md={5}>
                        <h2>Become a Real Estate Agent</h2>
                        <p>We only work with the best companies around the globe</p>
                    </Col>
                    <Col md={3} className="text-center">
                        <Button id="cta-btn">Register Now</Button>
                    </Col>
                </Row>
            </Container>
        </section>
    );
};

export default CallToAction;