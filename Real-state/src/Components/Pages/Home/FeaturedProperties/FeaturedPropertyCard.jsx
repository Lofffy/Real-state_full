import React from 'react';
import { Card, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRightArrowLeft, faHeart } from '@fortawesome/free-solid-svg-icons';
import { faLocationDot } from '@fortawesome/free-solid-svg-icons';
import agentPhoto from '../../../../assets/profile.jpg'

const FeaturedPropertyCard = ({ property }) => {
  return (
    <Card className="h-100 featured-property-card">
      <div className="card-image">
        <Card.Img variant="top" src={property.image} alt={property.title} />
        <div className="image-overlay">
          <div className="overlay-content">
            <div className="tags">
              <div className="tag featured">Featured</div>
              <div className="tag for-sale">For Sale</div>
            </div>
            <div className="bottom-content">
              <h3 className="price">${property.price}<span className="per-month"> / mo</span></h3>
              <div className="button-group">
                <Button className="btn">
                  <FontAwesomeIcon icon={faArrowRightArrowLeft} class="icon" />
                  <span className="visually-hidden">Compare</span>
                </Button>
                <Button className="btn">
                  <FontAwesomeIcon icon={faHeart} class="icon" />
                  <span className="visually-hidden">Favorite</span>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Card.Body>
        <p className="property-type">{property.type}</p>
        <Card.Title>{property.title}</Card.Title>
        <p className="location">
          <FontAwesomeIcon icon={faLocationDot} /> {property.location}
        </p>
        <div className="property-info d-flex gap-4">
          <p>Beds: {property.beds}</p>
          <p>Baths: {property.baths}</p>
          <p>SqFt: {property.sqFt}</p>
        </div>
        <hr />
        <div className="agent-info d-flex justify-content-between align-items-center">
          <div className="agent-details d-flex align-items-center">
            <img src={agentPhoto} className="agent-photo" alt="Agent Ali Tufan" />
            <p>{property.agent}</p>
          </div>
          <p className="time-ago">{property.timeAgo}</p>
        </div>
      </Card.Body>
    </Card>
  );
};

export default FeaturedPropertyCard;
