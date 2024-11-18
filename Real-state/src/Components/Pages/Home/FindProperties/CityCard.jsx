import React from 'react';
import { Link } from 'react-router-dom';    
import 'bootstrap/dist/css/bootstrap.min.css';


const CityCard = ({ cityName, propertiesCount, imageSrc, cardSize, onClick }) => {
  return (
    <Link to={`/properties`}
      className={`${cardSize} rounded overflow-hidden shadow-lg city-card custom-link`} 
      onClick={onClick}
      style={{ cursor: 'pointer' }} // Change the cursor to pointer for clickable indication
    >
      <img src={imageSrc} alt={`${cityName} Image`} className="img-fluid" />
      <div className="city-card-content p-3">
        <h6>{cityName}</h6>
        <span>{propertiesCount}Properties</span>
      </div>
    </Link>
  );
};

export default CityCard;
