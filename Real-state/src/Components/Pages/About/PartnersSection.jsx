import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

import partner1 from "../../../assets/Partner-Logo-1.png"
import partner2 from "../../../assets/Partner-Logo-2.png"
import partner3 from "../../../assets/Partner-Logo-3.png"
import partner4 from "../../../assets/Partner-Logo-4.png"
import partner5 from "../../../assets/Partner-Logo-5.png"

const PartnersSection = () => {
    return (
        <section className="partners-section">
            <Container>
                <Row className="text-center">
                    <Col xs={12}>
                        <h2 className="font-weight-bold">Our Partners</h2>
                        <p>We only work with the best companies around the globe</p>
                        <Row className="justify-content-center mt-5">
                            <Col xs={6} md={2} className="d-flex justify-content-center">
                                <img src={partner1} className="partner-logo" alt="Partner 1 Logo" />
                            </Col>
                            <Col xs={6} md={2} className="d-flex justify-content-center">
                                <img src={partner2} className="partner-logo" alt="Partner 2 Logo" />
                            </Col>
                            <Col xs={6} md={2} className="d-flex justify-content-center">
                                <img src={partner3} className="partner-logo" alt="Partner 3 Logo" />
                            </Col>
                            <Col xs={6} md={2} className="d-flex justify-content-center">
                                <img src={partner4} className="partner-logo" alt="Partner 4 Logo" />
                            </Col>
                            <Col xs={6} md={2} className="d-flex justify-content-center">
                                <img src={partner5} className="partner-logo" alt="Partner 5 Logo" />
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Container>
        </section>
    );
};

export default PartnersSection;
