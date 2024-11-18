import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import FeaturedPropertyCard from './FeaturedPropertyCard';
import './FeaturedProperties.css'

import featured1 from '../../../../assets/featured-1.jpg'
import featured2 from '../../../../assets/featured-2.jpg'
import featured3 from '../../../../assets/featured-3.jpg'

const FeaturedPropertiesSection = () => {
  const properties = [
    {
      id: 1,
      image: featured1,
      price: 13000,
      type: 'Apartment',
      title: 'Luxury Family Home',
      location: '1421 San Pedro St, Los Angeles, CA 900015',
      beds: 1,
      baths: 1,
      sqFt: 8280,
      agent: 'Ali Tufan',
      timeAgo: '1 Year Ago',
    },
    {
      id: 2,
      image: featured2,
      price: 14000,
      type: 'Bungalow',
      title: 'Renovated Apartment',
      location: '1421 San Pedro St, Los Angeles, CA 900015',
      beds: 2,
      baths: 2,
      sqFt: 5280,
      agent: 'Ali Tufan',
      timeAgo: '1 Year Ago',
    },
    {
      id: 3,
      image: featured3,
      price: 13000,
      type: 'Bungalow',
      title: 'Single Family Home',
      location: '1421 San Pedro St, Los Angeles, CA 900015',
      beds: 3,
      baths: 2,
      sqFt: 3280,
      agent: 'Ali Tufan',
      timeAgo: '1 Year Ago',
    },
  ];

  return (
    <section className="featured-properties-section">
      <Container>
        <Row>
          <Col className="text-center featured-properties-text">
            <h2>Featured Properties</h2>
            <p>Handpicked Properties by Our Team.</p>
          </Col>
        </Row>
        <Row className="featured-cards mt-4">
          {properties.map(property => (
            <Col key={property.id} lg={4} md={6} className="featured-card mb-4">
              <FeaturedPropertyCard property={property} />
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
};

export default FeaturedPropertiesSection;