const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    firstName: {
        type: String,
        required: true,
        trim: true
    },
    lastName: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        match: [/\S+@\S+\.\S+/, 'is invalid'] // simple email validation
    },
    phone: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        match: [/^\d{10,15}$/, 'is invalid'] // simple phone number validation
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    role: {
        type: String,
        enum: ['client', 'agent', 'admin'], // Only allow these three roles
        default: 'client' // Set 'client' as the default role
    }
}, {
    timestamps: true // adds createdAt and updatedAt timestamps
});

// Export the model
module.exports = mongoose.model('User', userSchema);
