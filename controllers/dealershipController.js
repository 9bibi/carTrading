const Dealership = require('../models/Dealership');

const getDealerships = async (req, res) => {
    try {
        const dealerships = await Dealership.find();
        res.json(dealerships);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = { getDealerships };