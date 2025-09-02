import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type : String,
        required : true,
        unique: true
    },
    password: {
        type : String,
        required : true,
    },

    // Roadhelp-specific fields
    role: { 
        type: String, 
        enum: ["customer", "mechanic", "admin"], 
        default: "customer" 
    },

    phoneNumber: {
        type: String,
        required: false,
    },

    // vehicles: [
    //     {
    //         type: { type: String, enum: ["car", "bike", "truck"], required: false },
    //         model: { type: String, required: false },
    //         registrationNumber: { type: String}
    //     }
    // ],

    // Only for mechanics
    specialization: [String], // e.g. ["towing", "battery replacement", "puncture repair"]

    location: {
        type: { type: String, enum: ["Point"], default: "Point" },
        coordinates: { type: [Number], default: [0, 0] } // [longitude, latitude]
    },

    rating: { 
        type: Number, 
        default: 0 
    },

    isAvailable: { 
        type: Boolean, 
        default: true 
    },

    createdAt: { 
        type: Date, 
        default: Date.now 
    }
});

// Enable geospatial queries for finding nearest mechanics
userSchema.index({ location: "2dsphere" });

const User = mongoose.model('User', userSchema);

export default User;
