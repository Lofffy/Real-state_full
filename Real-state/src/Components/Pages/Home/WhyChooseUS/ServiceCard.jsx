import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';

const ServiceCard = ({ title, icon, description }) => {
  return (
    <Link to={'/services'} className="service-card text-center bg-white p-4 shadow-sm custom-link">
      <div className="icon mb-5" style={{ fontSize: '2rem' }}>{icon}</div>
      <h3>{title}</h3>
      <p>{description}</p>
    </Link>
  );
};

export default ServiceCard;
