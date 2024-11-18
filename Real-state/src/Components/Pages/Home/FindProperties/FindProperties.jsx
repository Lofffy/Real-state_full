import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import CityCard from './CityCard'; // Import the CityCard component
import 'bootstrap/dist/css/bootstrap.min.css';
import Image from "../../../../assets/1.jpg"
import "./style.css"
import "./responsive.css"

const FindProperties = () => {
  // Array of city card details
  const cityCards = [
    { cityName: 'Miami', propertiesCount: '24', imageSrc: Image },
    { cityName: 'Los Angeles', propertiesCount: '18', imageSrc: Image },
    { cityName: 'New York', propertiesCount: '89', imageSrc: Image },
    { cityName: 'Florida', propertiesCount: '47', imageSrc: Image },
  ];

  return (
    <section id="Find-Properties">
      <Container>
        <Row>
          <Col>
            <div className="title-container text-center my-5">
              <h2>Find Properties in These Cities</h2>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
            </div>
          </Col>
        </Row>
        <Row>
          <Col className='pb-5'>
            <div className="city-cards d-flex w-100 justify-content-between flex-wrap">
              {cityCards.map((card, index) => (
                <CityCard
                  key={index}
                  cityName={card.cityName}
                  propertiesCount={card.propertiesCount}
                  imageSrc={card.imageSrc}
                  cardSize={index === 1 || index === 2 ? 'big-card' : 'small-card'}
                />
              ))}
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default FindProperties;
