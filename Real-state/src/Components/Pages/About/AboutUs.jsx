import React from 'react';
import Header from '../../Shared/Header';
import HeroSection from './HeroSection';
import ContentSection from './ContentSection';
import PartnersSection from './PartnersSection';
import CallToAction from '../../Shared/CallToAction';
import Footer from '../../Shared/Footer';
import './about.css';

const AboutUs = () => {
    return (
        <div>
            <Header />
            <HeroSection />
            <ContentSection />
            <PartnersSection />
            <CallToAction />
            <Footer />
        </div>
    );
};

export default AboutUs;