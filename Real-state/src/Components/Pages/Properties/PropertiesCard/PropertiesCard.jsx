import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import "../Properties.css";

function PropertyCard({ property }) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/properties/${property._id}`);
  };

  return (
    <div className="col mb-4" onClick={handleClick} style={{ cursor: 'pointer' }}>
      <div className="card shadow-sm h-100 ms-2">
        <div className="position-relative">
          <img
            src={property.images[0] || require("../../../../assets/property.png")}
            alt={property.title}
            className="card-img-top py-1 px-1 rounded overflow-hidden"
          />
          {property.propertyStatus === "For Rent" && (
            <span className="status text-white py-1 px-2 rounded">Rent</span>
          )}
          {property.propertyStatus === "For Sale" && (
            <span className="status text-white py-1 px-2 rounded">Sale</span>
          )}
          <span className="position-absolute bottom-0 start-0 py-3 px-3 text-white fw-bold">
            ${property.price}
          </span>
        </div>
        <div className="card-body">
          <p className="mainclr">{property.propertyType}</p>
          <h3 className="card-title h5">{property.title}</h3>
          <p className="card-text text-muted">
            <FontAwesomeIcon icon={faLocationDot} /> {property.address}
          </p>
          <div className="d-flex justify-content-start text-muted mt-2">
            <p className="me-3">Beds: {property.details.bedrooms}</p>
            <p className="me-3">Baths: {property.details.bathrooms}</p>
            <p className="me-3">Sqft: {property.details.propertySize}</p>
          </div>
        </div>
      </div>
    </div>
  );
}


function CardDisplay({ properties }) {
  return (
    <div className="row row-cols-1 row-cols-md-2 g-6" id="propertyCards">
      {properties.map((property, index) => (
        <PropertyCard key={index} property={property} />
      ))}
    </div>
  );
}

export default CardDisplay;