const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
    transaction_id: { type: Number, required: true, unique: true },
    customer_id: { type: Number, ref: 'Customer', required: true },
    car_id: { type: Number, ref: 'Car', required: true },
    dealer_id: { type: Number, ref: 'Dealership', required: true },
    date: { type: Date, default: Date.now },
    price: { type: Number, required: true },
    payment_method: { type: String, required: true },
    status: { type: String, default: 'Pending' },
});

module.exports = mongoose.model('Transaction', transactionSchema);