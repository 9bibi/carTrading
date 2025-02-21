const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
    customer_id: { type: Number, required: true, unique: true },
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true },
    address: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    zip_code: { type: String, required: true },
    preferences: {
        favorite_makes: [{ type: String }], // List of favorite car makes (e.g., Toyota, Honda)
        favorite_models: [{ type: String }], // List of favorite car models (e.g., Corolla, Civic)
        budget_range: { min: Number, max: Number }, // Budget range for cars
    },
    purchases: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Transaction' }],
});

module.exports = mongoose.model('Customer', customerSchema);