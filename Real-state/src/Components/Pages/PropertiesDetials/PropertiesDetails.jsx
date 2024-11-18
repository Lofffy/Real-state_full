import React, { useEffect, useState } from "react";
import { Carousel, Container, Row, Col, Card } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBed, faBath, faRulerCombined, faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "../../Shared/Header";
import Footer from "../../Shared/Footer";

const PropertyDetails = () => {
  const { propertyId  } = useParams();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        console.log(propertyId);
        
        const response = await fetch(`http://localhost:3001/api/properties/${propertyId}`);
        const data = await response.json();
        if (data.success) {
          setProperty(data.data);
        } else {
          console.error("Failed to load property details");
        }
      } catch (error) {
        console.error("Error fetching property details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProperty();
  }, [propertyId ]);

  if (loading) {
    return <p>Loading property details...</p>;
  }

  if (!property) {
    return <p>Property details not found.</p>;
  }

  return (
    <>  
    <Header/>
      <Container className="property-details my-5">
      <h1 className="mb-4">{property.title}</h1>
      <p><FontAwesomeIcon icon={faMapMarkerAlt} /> {property.address}</p>
      <Row>
        <Col md={8}>
          {property.images && property.images.length > 0 ? (
            <Carousel>
              {property.images.map((image, index) => (
                <Carousel.Item key={index}>
                  <img src={image} alt={`Property image ${index + 1}`} className="d-block w-100" />
                </Carousel.Item>
              ))}
            </Carousel>
          ) : (
            <p>No images available for this property.</p>
          )}
          <Card className="mt-4">
            <Card.Body>
              <Card.Title>Description</Card.Title>
              <Card.Text>{property.description}</Card.Text>
            </Card.Body>
          </Card>
          <Card className="mt-4">
            <Card.Body>
              <Card.Title>Property Details</Card.Title>
              <Row>
                <Col md={6}><strong>Price:</strong> ${property.price}</Col>
                <Col md={6}><strong>Property Type:</strong> {property.propertyType}</Col>
                <Col md={6}><strong>Status:</strong> {property.propertyStatus}</Col>
                <Col md={6}><strong>Bedrooms:</strong> {property.details?.bedrooms}</Col>
                <Col md={6}><strong>Bathrooms:</strong> {property.details?.bathrooms}</Col>
                <Col md={6}><strong>Size:</strong> {property.details?.propertySize} sqft</Col>
              </Row>
            </Card.Body>
          </Card>
          <Card className="mt-4">
            <Card.Body>
              <Card.Title>Additional Details</Card.Title>
              <Row>
                <Col md={6}><strong>Garage:</strong> {property.details?.garage}</Col>
                <Col md={6}><strong>Year Built:</strong> {new Date(property.details?.yearBuilt).getFullYear()}</Col>
                <Col md={6}><strong>Deposit:</strong> {property.additionalDetails?.deposit}</Col>
                <Col md={6}><strong>Pool Size:</strong> {property.additionalDetails?.poolSize} sqft</Col>
                <Col md={6}><strong>Amenities:</strong> {property.additionalDetails?.amenities}</Col>
              </Row>
            </Card.Body>
          </Card>
          <Card className="mt-4">
            <Card.Body>
              <Card.Title>Features</Card.Title>
              <Row>
                {Object.entries(property.features || {}).map(([feature, available]) => (
                  <Col md={4} key={feature}>
                    {available ? <p>✓ {feature.replace(/([A-Z])/g, ' $1')}</p> : null}
                  </Col>
                ))}
              </Row>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card>
            <Card.Body>
              <Card.Title>Listed By</Card.Title>
              <p><strong>{property.agent?.name}</strong></p>
              <p>{property.agent?.phone}</p>
              <p>{property.agent?.email}</p>
            </Card.Body>
          </Card>
          <Card className="mt-4">
            <Card.Body>
              <Card.Title>Location</Card.Title>
              {property.locationEmbedLink ? (
                <iframe
                  src={property.locationEmbedLink}
                  width="100%"
                  height="300"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  title="Property Location"
                ></iframe>
              ) : (
                <p>No location available.</p>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
    <Footer/>
    </>

  );
};

export default PropertyDetails;
