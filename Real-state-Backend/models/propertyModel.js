const mongoose = require('mongoose');

const propertySchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    address: {
        type: String,
        required: true,
        trim: true
    },
    price: {
        type: Number,
        required: true
    },
    propertyType: {
        type: String,
        enum: ['Apartment', 'Condo', 'House', 'Townhouse', 'Bungalow', 'Land'],
        required: true
    },
    propertyStatus: {
        type: String,
        enum: ['For Sale', 'For Rent'],
        required: true
    },
    description: {
        type: String,
        required: true
    },
    details: {
        propertyId: { type: String },
        bedrooms: { type: Number, required: true },
        bathrooms: { type: Number, required: true },
        propertySize: { type: Number, required: true }, // in square feet
        garage: { type: Number, default: 0 },
        garageSize: { type: Number }, // in square feet
        yearBuilt: { type: Date }
    },
    additionalDetails: {
        deposit: { type: Number }, // e.g., percentage or fixed amount
        poolSize: { type: Number }, // in square feet
        amenities: { type: String }, // e.g., "Clubhouse"
        additionalRooms: [{ type: String }], // e.g., "Guest Bath"
        equipment: [{ type: String }] // e.g., "Grill - Gas"
    },
    features: {
        airConditioning: { type: Boolean, default: false },
        lawn: { type: Boolean, default: false },
        swimmingPool: { type: Boolean, default: false },
        barbeque: { type: Boolean, default: false },
        dryer: { type: Boolean, default: false },
        gym: { type: Boolean, default: false },
        laundry: { type: Boolean, default: false },
        microwave: { type: Boolean, default: false },
        outdoorShower: { type: Boolean, default: false },
        refrigerator: { type: Boolean, default: false },
        sauna: { type: Boolean, default: false },
        tvCable: { type: Boolean, default: false },
        washer: { type: Boolean, default: false },
        wifi: { type: Boolean, default: false },
        windowCoverings: { type: Boolean, default: false }
    },
    locationEmbedLink: {
        type: String, // URL to embedded Google Maps
        required: true
    },
    images: [{
        type: String // URLs to images
    }],
    agent: {
        name: { type: String },
        phone: { type: String },
        email: { type: String }
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

// Middleware to update 'updatedAt' field on each document save
propertySchema.pre('save', function (next) {
    this.updatedAt = Date.now();
    next();
});

module.exports = mongoose.model('Property', propertySchema);
