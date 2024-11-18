import React from 'react';
import Header from '../../Shared/Header';
import HeroSection from './HeroSection';
import ContentSection from './ContactSection';
import MapSection from './MapSection';
import CallToAction from '../../Shared/CallToAction';
import Footer from '../../Shared/Footer';
import './contact.css';

const ContactUs = () => {
    return (
        <div>
            <Header />
            <HeroSection />
            <ContentSection />
            <MapSection />
            <CallToAction />
            <Footer />
        </div>
    );
};

export default ContactUs;