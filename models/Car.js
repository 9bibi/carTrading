const mongoose = require('mongoose');

const carSchema = new mongoose.Schema({
    car_id: { type: Number, required: true, unique: true },
    make: { type: String, required: true },
    model: { type: String, required: true },
    year: { type: Number, required: true },
    price: { type: Number, required: true },
    mileage: { type: Number, required: true },
    features: {
        fuel_type: { type: String },
        transmission: { type: String },
        owner: { type: String },
        seller_type: { type: String },
        engine: { type: String },
        max_power: { type: String },
        max_torque: { type: String },
        drivetrain: { type: String },
        dimensions: {
            length: { type: Number },
            width: { type: Number },
            height: { type: Number },
        },
        seating_capacity: { type: Number },
        fuel_tank_capacity: { type: Number },
    },
    location: { type: String, required: true },
    color: { type: String, required: true },
    dealer_id: { type: Number, required: true },
});

module.exports = mongoose.model('Car', carSchema);