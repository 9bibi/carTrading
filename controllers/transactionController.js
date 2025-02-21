const Transaction = require('../models/Transaction');
const Customer = require('../models/Customer');
const Car = require('../models/Car');
const Dealership = require('../models/Dealership');

// Get all transactions
const getAllTransactions = async (req, res) => {
    try {
        const transactions = await Transaction.find();

        
        const populatedTransactions = await Promise.all(transactions.map(async (transaction) => {
            const customer = await Customer.findOne({ customer_id: transaction.customer_id }).select('name email');
            const car = await Car.findOne({ car_id: transaction.car_id }).select('make model year price');
            const dealer = await Dealership.findOne({ dealer_id: transaction.dealer_id }).select('name email');

            return {
                ...transaction.toObject(),
                customer,
                car,
                dealer
            };
        }));

        res.json(populatedTransactions);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


// Get a transaction by id
const getTransactionById = async (req, res) => {
    try {
        const transactionId = Number(req.params.id);

        if (isNaN(transactionId)) {
            return res.status(400).json({ error: 'Invalid transaction ID format' });
        }

        const transaction = await Transaction.findOne({ transaction_id: transactionId });

        if (!transaction) {
            return res.status(404).json({ message: 'Transaction not found' });
        }

       
        const customer = await Customer.findOne({ customer_id: transaction.customer_id }).select('name email');
        const car = await Car.findOne({ car_id: transaction.car_id }).select('make model year price');
        const dealer = await Dealership.findOne({ dealer_id: transaction.dealer_id }).select('name email');

        res.json({
            ...transaction.toObject(),
            customer,
            car,
            dealer
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


// Create a new transaction
const createTransaction = async (req, res) => {
    try {
        const { transaction_id, customer_id, car_id, dealer_id, price, payment_method, status } = req.body;

        const newTransaction = new Transaction({
            transaction_id,
            customer_id,
            car_id,
            dealer_id,
            price,
            payment_method,
            status
        });

        await newTransaction.save();
        res.status(201).json(newTransaction);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update a transaction by numeric transaction_id
const updateTransaction = async (req, res) => {
    try {
        const transactionId = Number(req.params.id); // Convert to number

        if (isNaN(transactionId)) {
            return res.status(400).json({ error: 'Invalid transaction ID format' });
        }

        const transaction = await Transaction.findOneAndUpdate(
            { transaction_id: transactionId },
            req.body,
            { new: true }
        );

        if (!transaction) {
            return res.status(404).json({ message: 'Transaction not found' });
        }

        res.json(transaction);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Delete a transaction by numeric transaction_id
const deleteTransaction = async (req, res) => {
    try {
        const transactionId = Number(req.params.id); // Convert to number

        if (isNaN(transactionId)) {
            return res.status(400).json({ error: 'Invalid transaction ID format' });
        }

        const transaction = await Transaction.findOneAndDelete({ transaction_id: transactionId });

        if (!transaction) {
            return res.status(404).json({ message: 'Transaction not found' });
        }

        res.json({ message: 'Transaction deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    getAllTransactions,
    getTransactionById,
    createTransaction,
    updateTransaction,
    deleteTransaction
};