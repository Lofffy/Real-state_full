const Property = require('../models/propertyModel');

const getAllProperties = async (req, res) => {
    try {
        // Initialize empty filter object
        let filters = {};
        

        // Check if any query parameters exist
        if (Object.keys(req.query).length > 0) {
            filters = {}; // Reset filters if query params are found

            Object.keys(req.query).forEach((key) => {
                const value = req.query[key];

                // Price filters
                if (key === 'minPrice' || key === 'maxPrice') {
                    filters.price = filters.price || {};
                    if (key === 'minPrice') filters.price.$gte = Number(value);
                    if (key === 'maxPrice') filters.price.$lte = Number(value);

                // Size filters
                } else if (key === 'minSize' || key === 'maxSize') {
                    filters['details.propertySize'] = filters['details.propertySize'] || {};
                    if (key === 'minSize') filters['details.propertySize'].$gte = Number(value);
                    if (key === 'maxSize') filters['details.propertySize'].$lte = Number(value);

                // Bedrooms and bathrooms
                } else if (key === 'bedrooms' || key === 'bathrooms') {
                    filters[`details.${key}`] = Number(value);

                // Keyword search
                } else if (key === 'keyword') {
                    filters.$or = [
                        { title: { $regex: value, $options: 'i' } },
                        { description: { $regex: value, $options: 'i' } }
                    ];

                // Direct match for other fields (e.g., propertyType, propertyStatus)
                } else {
                    filters[key] = value;
                }
            });
        }

        // Fetch properties with or without filters
        const properties = await Property.find(filters);

        // Send the response with the filtered or unfiltered property list
        res.status(200).json({ success: true, data: properties });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};


const getPropertyById = async (req, res) => {
    try {
        console.log("HHIDD");
        
        const { id } = req.params;
        console.log(req.params);
        
    

        const property = await Property.findById(id);
        if (!property) {
            return res.status(404).json({ success: false, message: "Property not found" });
        }
        res.status(200).json({ success: true, data: property });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

const createProperty = async (req, res) => {
    try {
        const { images, locationEmbedLink, ...otherData } = req.body;

        // Create a new property with the provided image URLs and embed location link
        const propertyData = {
            ...otherData,
            locationEmbedLink,
            images, // Directly use the URLs from the request body
        };

        const newProperty = new Property(propertyData);
        await newProperty.save();
        res.status(201).json({ success: true, data: newProperty });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

const updateProperty = async (req, res) => {
    try {
        const updatedProperty = await Property.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        if (!updatedProperty) {
            return res.status(404).json({ success: false, message: 'Property not found' });
        }
        res.status(200).json({ success: true, data: updatedProperty });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

const deleteProperty = async (req, res) => {
    try {
        const deletedProperty = await Property.findByIdAndDelete(req.params.id);
        if (!deletedProperty) {
            return res.status(404).json({ success: false, message: 'Property not found' });
        }
        res.status(200).json({ success: true, message: 'Property deleted successfully' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

module.exports = {
    getAllProperties,
    getPropertyById,
    createProperty,
    updateProperty,
    deleteProperty
};
