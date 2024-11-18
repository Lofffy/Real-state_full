import React from 'react';
import { Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faTwitter, faAlgolia, faWordpress, faDribbble } from '@fortawesome/free-brands-svg-icons';

const ContactPanel = () => {
  return (
    <Col md={4} className="contactPanel">
      <h5>Contact Us</h5>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Tempora itaque, natus, quas ducimus
        aliquid ad totam.
      </p>
      <div className="panelDetails">
        <h6>Address</h6>
        <p>2301 Ravenswood Rd Madison, WI 53711</p>
      </div>
      <div className="panelDetails">
        <h6>Phone</h6>
        <p>(335) 905 2321</p>
      </div>
      <div className="panelDetails">
        <h6>Mail</h6>
        <p>info@findhome.com</p>
      </div>
      <div className="panelDetails">
        <h6>Skype</h6>
        <p>findhouse.com</p>
      </div>
      <div className="panelDetails">
        <h6>Follow Us</h6>
        <div className="d-flex gap-4">
          <div className="panelIcon">
            <a href="#" aria-label="Facebook">
              <FontAwesomeIcon icon={faFacebookF} />
            </a>
          </div>
          <div className="panelIcon">
            <a href="#" aria-label="Twitter">
              <FontAwesomeIcon icon={faTwitter} />
            </a>
          </div>
          <div className="panelIcon">
            <a href="#" aria-label="Algolia">
              <FontAwesomeIcon icon={faAlgolia} />
            </a>
          </div>
          <div className="panelIcon">
            <a href="#" aria-label="WordPress">
              <FontAwesomeIcon icon={faWordpress} />
            </a>
          </div>
          <div className="panelIcon">
            <a href="#" aria-label="Dribbble">
              <FontAwesomeIcon icon={faDribbble} />
            </a>
          </div>
        </div>
      </div>
    </Col>
  );
};

export default ContactPanel;