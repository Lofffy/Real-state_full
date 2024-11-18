import React from 'react';
import { Container, Row, Col } from 'react-bootstrap'; // Import Bootstrap components
import styles from './PropertyTitle.module.css'; // Import CSS module

const PropertyTitle = ({ property }) => {
  return (
    <Container>
      <Row className="d-flex flex-wrap">
        <Col md={8}>
          <div id="property-section">
            <div>
              <h2 >
                {property.title}
              </h2>
              <p >
                {property.address}
              </p>
            </div>
          </div>
        </Col>
        <Col md={4} className="d-flex align-items-center">
            <h2>
              {property.price}
            </h2>
        </Col>
      </Row>
    </Container>
  );
};

export default PropertyTitle;
