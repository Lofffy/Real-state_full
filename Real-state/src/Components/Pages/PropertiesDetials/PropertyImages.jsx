import React from 'react';
import './PropertyImages.css'; // Import custom CSS

const PropertyImages = ({ property }) => {
    const displayPropertyImages = () => {
        console.log(property);
        
        // Main Image
        const mainImageHTML = (
            <img
                className="img-fluid rounded d-block main-image"
                src={property.images[0]}
                alt="Main Property Image"
            />
        );

        // Thumbnails
        const subImagesHTML = property.images.slice(1).map((image, index) => (
            <div key={index} className="thumbnail-container m-1">
                <img
                    src={image}
                    alt={`Property Thumbnail ${index + 2}`}
                    className="rounded thumbnail"
                    data-index={index + 1}
                />
            </div>
        ));

        return { mainImageHTML, subImagesHTML };
    };

    const { mainImageHTML, subImagesHTML } = displayPropertyImages();

    return (
        <div className="container text-center text-white d-flex flex-wrap justify-content-between mb-5">
            <div className="row">
                {/* Use Bootstrap classes to control the layout on different screen sizes */}
                <div id="main-image" className="col-12 col-md-8">
                    {mainImageHTML}
                </div>
                <div id="sub-images" className="col-12 col-md-4 mt-3 mt-md-0">
                    <div className="sub-images d-flex flex-column flex-wrap justify-content-between">
                        {subImagesHTML}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PropertyImages;
