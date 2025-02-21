const express = require('express');
const {
    getCustomers,
    getCustomerById,
    createCustomer,
    updateCustomer,
    deleteCustomer,
    updateCustomerPreferences,
} = require('../controllers/customerController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

// Public routes
router.get('/', getCustomers);
router.get('/:id', getCustomerById);

// Protected routes (require authentication)
router.post('/', authMiddleware(['dealership']), createCustomer); // Only admins can create customers
router.put('/:id', authMiddleware(['customer', 'dealership']), updateCustomer); // Customers can update their own profile
router.delete('/:id', authMiddleware(['dealership']), deleteCustomer); // Only admins can delete customers
router.put('/:id/preferences', authMiddleware(['dealership']), updateCustomerPreferences);

module.exports = router;