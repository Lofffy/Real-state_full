import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom"; // Import Link
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram, faTwitter, faFacebookF, faPinterest } from '@fortawesome/free-brands-svg-icons';
import "./general.css";

function Footer() {
  return (
    <footer>
      <div className="footer-upper-part">
        <Container>
          <Row className="py-5 justify-content-between">

            <Col xs={12} md={5} lg={3} className="mb-4">
              <h6>About Site</h6>
              <p>We're reimagining how you buy, sell and rent. It's now easier to get into a place you love. So let's do it together.</p>
            </Col>

            <Col xs={12} md={5} lg={2} className="mb-4">
              <h6>Quick Links</h6>
              <div className="flex-column">
                {["About Us", "Terms & Conditions", "User's Guide", "Support Center", "Press Info"].map((link) => (
                  <p key={link}><Link to="#">{link}</Link></p>
                ))}
              </div>
            </Col>

            <Col xs={12} md={5} lg={2} className="mb-4">
              <h6>Contact Us</h6>
              <div className="flex-column">
                <p>info@findhome.com</p>
                <p>Collins Street West, Victoria 8007, Australia.</p>
                <p>+1 246-345-0699</p>
                <p>+1 246-345-0695</p>
              </div>
            </Col>

            <Col xs={12} md={5} lg={3}>
              <h6>Follow Us</h6>
              <div className="d-flex gap-4 mt-3">
                {[
                  { name: 'instagram', icon: faInstagram },
                  { name: 'twitter', icon: faTwitter },
                  { name: 'facebook', icon: faFacebookF },
                  { name: 'pinterest', icon: faPinterest }
                ].map((platform) => (
                  <Link key={platform.name} to="#">
                    <FontAwesomeIcon icon={platform.icon} className="fa-lg" style={{ color: 'lightgray' }} aria-hidden="true" />
                  </Link>
                ))}
              </div>
              <h6 className="mt-4">Subscribe</h6>
              <div className="d-flex gap-1 mt-3">
                <input type="text" placeholder="Your email" className="form-control" />
                <button className="btn btn-primary">{'>'}</button>
              </div>
            </Col>

          </Row>
        </Container>
      </div>

      <div className="footer-bottom-part">
        <Container>
          <Row className="justify-content-between" style={{ gap: '15px' }}>

            <Col xs={12} md={6}>
              <div className="d-flex flex-wrap" style={{ gap: '15px' }}>
                {["Home", "Listing", "Property", "About Us", "Blog", "Contact"].map((link) => (
                  <Link key={link} to="#">{link}</Link>
                ))}
              </div>
            </Col>

            <Col xs={12} md={3}>
              <p style={{ margin: 0 }}>© 2024 by Company. All Rights Reserved.</p>
            </Col>

          </Row>
        </Container>
      </div>
    </footer>
  );
}

export default Footer;