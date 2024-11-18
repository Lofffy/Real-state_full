import React, { useEffect, useState } from 'react';
import "./general.css";

const ScrollToTopButton = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (document.body.scrollTop > 400 || document.documentElement.scrollTop > 400) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        isVisible && (
            <button className="btn" id="scrollToTopBtn" title="Go to top" onClick={scrollToTop} style={{ backgroundColor: '#24324a' }}>
                <i className="fa-solid fa-chevron-up" aria-hidden="true"></i>
            </button>
        )
    );
};

export default ScrollToTopButton;