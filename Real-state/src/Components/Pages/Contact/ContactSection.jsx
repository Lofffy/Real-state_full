import React from 'react';
import { Container, Row } from 'react-bootstrap';
import ContactForm from './ContactForm';
import ContactPanel from './ContactPanel';

const ContactSection = () => {
  return (
    <section className="content">
      <Container>
        <Row className="m-auto d-flex flex-wrap justify-content-center gap-5">
          <ContactForm />
          <ContactPanel />
        </Row>
      </Container>
    </section>
  );
};

export default ContactSection;