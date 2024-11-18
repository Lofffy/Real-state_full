import React from 'react';
import { Container, Row } from 'react-bootstrap';
import ServiceCard from './ServiceCard';
import serviceData from './serviceData';
import Header from '../../Shared/Header';
import Footer from '../../Shared/Footer';
import './services.css'; // Import your custom CSS

// Array of card data (images and text)


const Services = () => {
  return (
    <>
    <Header />
      <setion id='mainServices'>
        <div className="back">
          <div className="overlay"></div>
          <div className="backTry">
            <p>Home / Service</p>
            <h3>Service</h3>
          </div>
        </div>

        <Container className="py-5">
          <Row>
            {serviceData.map((card, index) => (
              <ServiceCard key={index} image={card.image} title={card.title} />
            ))}
          </Row>
        </Container>
      </setion>
    <Footer />
    </>
  );
};

export default Services;
