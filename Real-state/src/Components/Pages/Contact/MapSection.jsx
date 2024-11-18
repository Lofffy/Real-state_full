import React from 'react';

const MapSection = () => {
  return (
    <section className="map">
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3151.7940072409856!2d144.95667600000002!3d-37.818293700000005!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad65d4cee0cec83%3A0xd019c5f69915a4a0!2sCollins%20St%2C%20Melbourne%20VIC%2C%20Australia!5e0!3m2!1sen!2seg!4v1726018271961!5m2!1sen!2seg"
        width="100%"
        height="500"
        style={{ border: 0 }}
        allowFullScreen=""
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      ></iframe>
    </section>
  );
};

export default MapSection;
