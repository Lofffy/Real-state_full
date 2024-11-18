
import React from 'react';
import { Card, Col } from 'react-bootstrap';

const ServiceCard = ({ image, title }) => {
  return (
    <Col md={4} className="mb-4">
      <Card>
        <Card.Img variant="top" src={image} />
        <Card.Body>
          <Card.Text>{title}</Card.Text>
        </Card.Body>
      </Card>
    </Col>
  );
};

export default ServiceCard;
