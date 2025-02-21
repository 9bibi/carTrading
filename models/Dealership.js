const mongoose = require('mongoose');

const dealershipSchema = new mongoose.Schema({
    dealer_id: { type: Number, required: true, unique: true },
    location: { type: String, required: true },
    name: { type: String, required: true },
    inventory: [{ type: Number }],
});

module.exports = mongoose.model('Dealership', dealershipSchema);