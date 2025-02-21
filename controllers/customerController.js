const Customer = require('../models/Customer');

// Get all customers
const getCustomers = async (req, res) => {
    try {
        const customers = await Customer.find().populate('purchases');
        res.json(customers);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get a single customer by customer_id
const getCustomerById = async (req, res) => {
    try {
        const customerId = Number(req.params.id); // Convert ID to Number

        if (isNaN(customerId)) {
            return res.status(400).json({ error: 'Invalid customer ID format' });
        }

        const customer = await Customer.findOne({ customer_id: customerId }).populate('purchases');

        if (!customer) {
            return res.status(404).json({ message: 'Customer not found' });
        }

        res.json(customer);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Create a new customer
const createCustomer = async (req, res) => {
    try {
        const customer = new Customer(req.body);
        await customer.save();
        res.status(201).json(customer);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update a customer by customer_id
const updateCustomer = async (req, res) => {
    try {
        const customerId = Number(req.params.id);
        if (isNaN(customerId)) {
            return res.status(400).json({ error: 'Invalid customer ID format' });
        }

        const customer = await Customer.findOneAndUpdate(
            { customer_id: customerId },
            req.body,
            { new: true }
        );

        if (!customer) return res.status(404).json({ message: 'Customer not found' });
        res.json(customer);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Delete a customer by customer_id
const deleteCustomer = async (req, res) => {
    try {
        const customerId = Number(req.params.id);
        if (isNaN(customerId)) {
            return res.status(400).json({ error: 'Invalid customer ID format' });
        }

        const customer = await Customer.findOneAndDelete({ customer_id: customerId });

        if (!customer) return res.status(404).json({ message: 'Customer not found' });

        res.json({ message: 'Customer deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update customer preferences
const updateCustomerPreferences = async (req, res) => {
    try {
        const customerId = Number(req.params.id);
        if (isNaN(customerId)) {
            return res.status(400).json({ error: 'Invalid customer ID format' });
        }

        const customer = await Customer.findOneAndUpdate(
            { customer_id: customerId },
            { preferences: req.body.preferences },
            { new: true }
        );

        if (!customer) return res.status(404).json({ message: 'Customer not found' });

        res.json(customer);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    getCustomers,
    getCustomerById,
    createCustomer,
    updateCustomer,
    deleteCustomer,
    updateCustomerPreferences,
};
