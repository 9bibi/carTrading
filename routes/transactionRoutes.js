const express = require('express');
const router = express.Router();
const transactionController = require('../controllers/transactionController');
const authMiddleware = require('../middleware/authMiddleware');

// Get all transactions
router.get('/', transactionController.getAllTransactions);

// Get a transaction by numeric transaction_id
router.get('/:id', authMiddleware(['customer', 'dealership']), transactionController.getTransactionById);

// Create a new transaction
router.post('/', authMiddleware(['customer', 'dealership']), transactionController.createTransaction);

// Update a transaction by numeric transaction_id
router.put('/:id', authMiddleware(['dealership']), transactionController.updateTransaction);

// Delete a transaction by numeric transaction_id
router.delete('/:id', authMiddleware(['dealership']), transactionController.deleteTransaction);

module.exports = router;