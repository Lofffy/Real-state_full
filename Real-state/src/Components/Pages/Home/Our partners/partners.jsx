import React from 'react';
import './partners.css'

const PartnersSection = () => {
  return (
    <>
    <section className="partners-section text-center mt-5">
        <div>
          <h2 className='fw-bold'>Our Partners</h2>
          <p>We only work with the best companies around the globe</p>
        </div>
        <div className="w-75 gap-4 m-auto d-flex justify-content-evenly flex-wrap my-5">
          <img src={require("../../../../assets/_assets_images_partners_1.png")} alt="Partner 1" className="partner-logo" />
          <img src={require("../../../../assets/_assets_images_partners_2.png")} alt="Partner 2" className="partner-logo" />
          <img src={require("../../../../assets/_assets_images_partners_3.png")} alt="Partner 3" className="partner-logo" />
          <img src={require("../../../../assets/_assets_images_partners_4.png")} alt="Partner 4" className="partner-logo" />
          <img src={require("../../../../assets/_assets_images_partners_5.png")} alt="Partner 5" className="partner-logo" />
        </div>
    </section>
    <section className="cta-section">
      <div className="container d-flex justify-content-between align-items-center w-75 flex-wrap py-4">
        <div id="head">
          <h2>Become a Real Estate Agent</h2>
          <p>We only work with the best companies around the globe</p>
        </div>
        <button type="button" className="btn" id="cta-btn">Register Now</button>
      </div>
    </section>
    </>
  );
};

export default PartnersSection;