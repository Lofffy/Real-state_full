import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import ServiceCard from './ServiceCard'; // Import the ServiceCard component
import BlogCard from './BlogCard'; // Import the BlogCard component
import './style.css'; // Your custom CSS file
import Image from "../../../../assets/1.jpg"
import { Link } from 'react-router-dom';

const WhyChooseUs = () => {
  // Data for service cards
  const cardData = [
    { title: 'Trusted By Thousands', icon: '👥', description: 'Aliquam dictum elit vitae mauris facilisis at dictum urna dignissim donec vel lectus vel felis.' },
    { title: 'Wide Range Of Properties', icon: '🏡', description: 'Aliquam dictum elit vitae mauris facilisis at dictum urna dignissim donec vel lectus vel felis.' },
    { title: 'Financing Made Easy', icon: '💰', description: 'Aliquam dictum elit vitae mauris facilisis at dictum urna dignissim donec vel lectus vel felis.' }
  ];

  // Data for blog cards
  const BolgData = [
    {
      image: Image,
      category: 'Business',
      title: 'Skills That You Can Learn In The Real Estate Market',
      author: 'Ali Tufan',
      date: '7 August 2022',
      authorImage: Image
    },
    {
      image: Image,
      category: 'Construction',
      title: 'Bedroom Colors You Will Never Regret',
      author: 'Ali Tufan',
      date: '7 August 2022',
      authorImage: Image
    },
    {
      image: Image,
      category: 'Business',
      title: '5 Essential Steps for Buying Everyone Investment',
      author: 'Ali Tufan',
      date: '7 August 2022',
      authorImage: Image
    }
  ];

  return (
    <section id="why-choose-us" className="backcolor pb-5">
      <Container>
        {/* Title Section */}
        <Row>
          <Col>
            <div className="title-container text-center m-5">
              <h2>Why Choose Us</h2>
              <p>We provide full service at every step</p>
            </div>
          </Col>
        </Row>

        {/* Service Cards Section */}
        <Row>
          {cardData.map((card, index) => (
            <Col md={4} key={index}>
              <ServiceCard 
                title={card.title} 
                icon={card.icon} 
                description={card.description} 
              />
            </Col>
          ))}
        </Row>

        {/* Articles & Tips Section */}
        <Row className="artical-tips title">
          <Col>
            <div className="title-container text-center m-5">
              <h2>Articles & Tips</h2>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
            </div>
          </Col>
        </Row>

        {/* Blog Cards Section */}
        <Row className="artical-tips-card">
          <Col>
            <div className="card-container-tips w-100 d-flex justify-content-between flex-wrap">
              {BolgData.map((card, index) => (
                <BlogCard 
                  key={index} 
                  image={card.image} 
                  category={card.category} 
                  title={card.title} 
                  author={card.author} 
                  date={card.date} 
                  authorImage={card.authorImage} 
                />
              ))}
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default WhyChooseUs;
